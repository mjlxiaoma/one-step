<!-- src/components/MovingBox.vue -->
<template>
  <div id="box" :style="{ left: x + 'px' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const duration = 2000; // Animation duration in milliseconds
const startX = 0;
const endX = 300;
let startTime: number | null = null;
let animationFrameId: number;

function animate(timestamp: number) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1

  x.value = startX + (endX - startX) * progress;

  if (progress < 1) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
#box {
  width: 50px;
  height: 50px;
  background-color: red;
  position: absolute;
  top: 50px;
  left: 0;
}
</style>
