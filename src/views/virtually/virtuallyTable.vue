<template>
  <div>
    海报
    <canvas ref="posterCanvas" width="400" height="600"></canvas>
  </div>
  <button @click="generatePoster">生成海报</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const posterCanvas = ref()
const generatePoster = () => {
  const canvas = posterCanvas.value;
  const ctx = canvas.getContext('2d');

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制海报内容
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('这是海报标题', 50, 50);

  ctx.font = '14px Arial';
  ctx.fillText('这是一些内容', 50, 80);

  // 示例：绘制图片
  const image = new Image();
  image.src = 'image.jpg';
  image.onload = function () {
    ctx.drawImage(image, 50, 100, 300, 300);
  };

  // 导出图片
  const imgData = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'poster.jpg';
  link.click();
}
</script>

<style lang="scss" scoped></style>