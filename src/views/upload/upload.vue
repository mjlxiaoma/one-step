<template>
  <div class="upload">
  </div>
  <div id="video" style="display: flex;">
    <a-upload :before-upload="handleVideoUpload" accept="video/*" show-upload-list="false">
      <a-button icon="upload">上传视频</a-button>
    </a-upload>
    <video ref="video" controls @loadedmetadata="onVideoLoaded"
      style="display: block; margin-top: 20px;width: 500px;height: 300px;"></video>
    <a-button @click="captureFrame" style="margin-top: 20px;">选择当前帧作为封面图</a-button>
    <div v-if="thumbnail" style="margin-top: 20px;">
      <h3>封面图预览：</h3>
      <img :src="thumbnail" alt="封面图预览" style="width: 500px;height: 300px;">
    </div>
  </div>
  <a-button @click="handleClick" type="primary"> 修改 </a-button>
  <button class="color">nihaoa</button>
  <input type="">
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { addFun } from 'mjlpackge'
console.log(addFun);
const video = ref(null);
const thumbnail = ref('');
const handleVideoUpload = (file) => {
  const url = URL.createObjectURL(file);
  video.value.src = url;
  return false; // 阻止默认的上传行为
};

const onVideoLoaded = () => {
  video.value.currentTime = 1; // 跳到视频的1秒处
};

const captureFrame = () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = video.value.videoWidth;
  canvas.height = video.value.videoHeight;
  console.log(video.value, 'video.value');

  context.drawImage(video.value, 0, 0, canvas.width, canvas.height);
  thumbnail.value = canvas.toDataURL('image/png');
  console.log(thumbnail.value, ' thumbnail.value');

};

let t_color = ref('#f60')
let b_color = ref('#000')
const isEdit = ref(false)
const handleClick = () => {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    t_color.value = 'red'
    b_color.value = '#eee'
  } else {
    t_color.value = '#f60'
    b_color.value = '#000'
  }

  console.log('点击了', t_color, b_color);
}
</script>
<style lang="scss" scoped>
.upload {
  width: 100px;
  height: 100px;
}

.color {

  --textColor: v-bind(t_color);
  --bgColor: v-bind(b_color);
  color: var(--textColor);
  background-color: var(--bgColor);
}

/* 设置容器的样式 */
.container1 {
  width: 100px;
  max-height: 40px;
  overflow: hidden;

  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // overflow: hidden;
  // // text-overflow: ellipsis;
  // -webkit-line-clamp: 2;
}

.container {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  // text-overflow: ellipsis;
  -webkit-line-clamp: 3;


  // display: -webkit-box;
  // /* 使用WebKit引擎的弹性盒子布局 */
  // -webkit-line-clamp: 2;
  // /* 设置要截断的行数 */
  // -webkit-box-orient: vertical;
  // overflow: hidden;
  // /* 垂直排列 */
  // // line-height: 1.2em;
  // /* 每行的高度，与容器行数对应 */
}
</style>