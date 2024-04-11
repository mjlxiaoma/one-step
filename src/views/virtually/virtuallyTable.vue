<template>
  <div>
    <input type="file" @change="loadImage" accept="image/*">
    <canvas ref="canvas" width="400" height="300"
            @mousedown="startCrop"
            @mousemove="cropping"
            @mouseup="endCrop"
            @mouseleave="endCrop"
            style="cursor: crosshair;"></canvas>
    <button @click="crop">裁剪</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const img = ref(null);
    const canvas = ref(null);
    const ctx = ref(null);
    const startX = ref(0);
    const startY = ref(0);
    const endX = ref(0);
    const endY = ref(0);
    const isCropping = ref(false);

    const loadImage = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        img.value = new Image();
        img.value.onload = () => {
          ctx.value = canvas.value.getContext('2d');
          ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
          ctx.value.drawImage(img.value, 0, 0);
        };
        img.value.src = reader.result;
      };

      reader.readAsDataURL(file);
    };

    const startCrop = (event) => {
      if (!img.value) return;
      isCropping.value = true;
      startX.value = event.offsetX;
      startY.value = event.offsetY;
    };

    const cropping = (event) => {
      if (!isCropping.value) return;
      endX.value = event.offsetX;
      endY.value = event.offsetY;

      const x = Math.min(startX.value, endX.value);
      const y = Math.min(startY.value, endY.value);
      const width = Math.abs(startX.value - endX.value);
      const height = Math.abs(startY.value - endY.value);

      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
      ctx.value.drawImage(img.value, 0, 0);
      ctx.value.strokeStyle = 'red';
      ctx.value.strokeRect(x, y, width, height);
    };

    const endCrop = () => {
      isCropping.value = false;
    };

    const crop = () => {
      if (!img.value) return;
      const x = Math.min(startX.value, endX.value);
      const y = Math.min(startY.value, endY.value);
      const width = Math.abs(startX.value - endX.value);
      const height = Math.abs(startY.value - endY.value);

      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
      ctx.value.drawImage(img.value, x, y, width, height, 0, 0, width, height);
    };

    const reset = () => {
      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
      img.value = null;
    };

    return { loadImage, startCrop, cropping, endCrop, crop, reset, img, canvas };
  }
};
</script>
