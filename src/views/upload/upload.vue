<template>
  <div class="video-cover-selector">
    <!-- 视频上传 -->
    <input type="file" accept="video/*" @change="handleFileUpload" />

    <!-- 视频播放器 -->
    <div class="video-container" v-if="videoSrc">
      <video ref="video" width="640" height="360" controls @play="startCaptureFrames" @timeupdate="updateSlider"
        style="display: block">
        <source :src="videoSrc" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- 时间轴 -->
    <div class="timeline" ref="timeline" @mousedown="startDrag">
      <div class="slider" :style="{ left: `${sliderPosition}px` }"></div>
    </div>

    <!-- 显示视频帧的图片列表 -->
    <div class="photo-list">
      <div v-for="(frame, index) in frames" :key="index" class="frame-container"
        :class="{ selected: selectedFrameIndex === index }">
        <img :src="frame" class="frame-image" @click="selectCover(index)" />
      </div>
    </div>

    <!-- 当前选中的封面图 -->
    <div v-if="coverFrame" class="cover-preview">
      <h3>封面图：</h3>
      <img :src="coverFrame" alt="Selected Cover" />
      <button @click="confirmCover">确认封面图</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const videoSrc = ref(null); // 视频的URL
const video = ref(null); // 视频元素的引用
const canvas = ref(null); // canvas元素的引用
const ctx = ref(null); // canvas上下文
const frames = ref([]); // 存储视频帧的Base64图像
const timeline = ref(null); // 时间轴元素
const sliderPosition = ref(0); // 当前时间轴的滑块位置
const selectedFrameIndex = ref(null); // 当前选中的帧索引
const coverFrame = ref(null); // 当前选中的封面图

// 处理视频文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    videoSrc.value = URL.createObjectURL(file); // 设置视频的URL
  }
};

// 在组件挂载时初始化canvas的context
onMounted(() => {
  canvas.value = document.createElement("canvas");
  ctx.value = canvas.value.getContext("2d");
});

// 提取视频帧并显示
const startCaptureFrames = () => {
  const captureFramesInterval = setInterval(() => {
    if (video.value.paused || video.value.ended) {
      clearInterval(captureFramesInterval);
      return;
    }

    // 设置canvas大小为视频的宽高
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;

    // 绘制视频当前帧到canvas
    ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

    // 获取当前帧的Base64编码
    const frame = canvas.value.toDataURL();

    // 将当前帧存入frames数组
    frames.value.push(frame);
  }, 100); // 每100ms提取一帧
};

// 更新时间轴滑块的位置
const updateSlider = () => {
  if (video.value && video.value.duration) {
    const progress = (video.value.currentTime / video.value.duration) * 100;
    sliderPosition.value = (progress / 100) * timeline.value.offsetWidth;

    // 更新当前帧索引
    selectedFrameIndex.value = Math.floor((progress / 100) * frames.value.length);
  }
};

// 拖动时间轴选择帧
const startDrag = (event) => {
  const timelineRect = timeline.value.getBoundingClientRect();
  const startX = event.clientX;
  const timelineWidth = timelineRect.width;

  const onMouseMove = (e) => {
    const offsetX = e.clientX - startX;
    const newPosition = Math.max(0, Math.min(timelineWidth, offsetX));
    sliderPosition.value = newPosition;

    // 计算当前帧的索引
    selectedFrameIndex.value = Math.floor((newPosition / timelineWidth) * frames.value.length);

    // 更新视频播放时间F
    video.value.currentTime = (selectedFrameIndex.value / frames.value.length) * video.value.duration;
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};

// 选择封面图
const selectCover = (index) => {
  selectedFrameIndex.value = index;
  coverFrame.value = frames.value[index]; // 设置封面图
};

// 确认封面图
const confirmCover = () => {
  if (coverFrame.value) {
    alert(`封面图已确认: ${coverFrame.value}`);
  } else {
    alert("请先选择一个封面图");
  }
};
</script>

<style scoped lang="scss">
.video-cover-selector {
  width: 680px;
  margin: 0 auto;
}

.video-container {
  position: relative;
  margin-bottom: 20px;
}

.timeline {
  position: relative;
  height: 10px;
  background-color: #f0f0f0;
  width: 640px;
  margin-top: 20px;
}

.slider {
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  background-color: #007bff;
  cursor: pointer;
}

.photo-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
}

.frame-container {
  margin: 5px;
  position: relative;
}

.frame-image {
  width: 100px;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s;
}

.frame-container.selected .frame-image {
  transform: scale(1.1);
  border: 2px solid #007bff;
}

.cover-preview {
  margin-top: 20px;
  text-align: center;
}

.cover-preview img {
  max-width: 200px;
  margin-top: 10px;
}

.confirm-cover-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
