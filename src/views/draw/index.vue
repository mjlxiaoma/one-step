<!-- <template>
  <div class="container">
    <div v-for="(item, index) in DrawList" :key="index" class="prize-item" :class="currentIndex === index ? 'active' : ''"
      @click="() => draw(index)">
      <img :src="item.url" alt="" />
      <p class="desc">{{ item.desc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
interface Prize {
  url: string
  desc: string
}
const pirzeList: Prize[] = [
  { url: 'redEnvelope', desc: '现金红包' },
  { url: 'topPrize', desc: '一等奖' },
  { url: 'thirdPrize', desc: '三等奖' },
  { url: 'none', desc: '谢谢参与' },
  { url: 'secondPrize', desc: '二等奖' },
  { url: 'redEnvelope', desc: '现金红包' },
  { url: 'none', desc: '谢谢参与' },
  { url: 'fourthPrize', desc: '四等奖' }
]
const btnStart = { url: '', desc: '开始抽奖' }
const DrawList = computed(() => {
  return [...pirzeList.slice(0, 4), btnStart, ...pirzeList.slice(4)]
})
const drawOrder = [0, 1, 2, 5, 8, 7, 6, 3] // 抽奖顺序
let count = 0 // 抽奖次数
let isDrawing = false // 是否正在抽奖
const currentIndex = ref<number | null>(null) // 当前选中的奖品
const circle = 32 // 一圈8个奖品，至少转4圈

const draw = (index: number) => {
  if (index === 4) {
    // 开始抽奖
    if (isDrawing) {
      return
    }
    isDrawing = true
    const position = 5 // 假设后台返回的中奖位置是5
    const timer = setInterval(() => {
      // 当前选中奖品 == 抽奖顺序中的 抽奖次数%抽奖列表长度
      currentIndex.value = drawOrder[count % drawOrder.length]
      // 每过500毫秒count加1
      count++
      // 当count加到circle表示转圈完毕 并且当前选中奖品 == 
      if (count > circle && currentIndex.value === drawOrder[position - 1]) {
        // 抽奖结束
        clearInterval(timer)
        // 停顿一会显示中奖
        setTimeout(() => {
          alert('恭喜你中奖了')
          isDrawing = false;
          count = 0
          currentIndex.value = null
        }, 500)
      }
    }, 50)
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 528px;
  height: 528px;
  // background-color: #f60;
  // background: url('../assets/bg.png') no-repeat;
  padding: 55px 55px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;

  .prize-item {
    width: 130px;
    height: 130px;
    text-align: center;

    img {
      margin-top: 10px;
    }
  }

  .active {
    background-color: rgb(214, 83, 83);
  }
}
</style> -->
<template>
  <!-- <div style="display: flex; overflow-x: auto;">
    <div style="width: 2000px; min-width: 1000px; height: 500px; background-color: skyblue; flex-shrink: 0;">

    </div>
    <div style="width: 100%; height: 500px; background-color: #f60; ">
      <div style="display: flex; width: 100%; height: 100%;">
        <div style="width: 200px; height: 100%; background-color: #f60;"></div>
        <div style="flex: 1; background-color: skyblue; min-width: 600px;"></div>
        <div style="width: 200px; height: 100%; background-color: #f60;"></div>
      </div>
    </div>

  </div> -->
  <div style="display: flex;flex-wrap: wrap;align-content: center;flex-direction: column;">
    <div style="width: 100px;height: 100px;background-color: skyblue;">1</div>
    <div style="width: 100px;height: 100px;background-color: salmon;">2</div>
    <div style="width: 100px;height: 100px;background-color: antiquewhite;">3</div>
    <div style="width: 100px;height: 100px;background-color: c;">4</div>
  </div>
</template>
<script setup lang="ts">






</script>
<style lang="scss" scoped></style>
