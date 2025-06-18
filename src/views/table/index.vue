<template>
  <a-select v-model:value="selected" mode="multiple" style="width: 300px" placeholder="请选择" :options="renderedOptions"
    allow-clear @change="handleChange" />
  <a-button @click="handleSubmit">提交</a-button>
  <TresCanvas window-size>
    <!-- Your scene goes here -->
  </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
/**
 * 手写promise
 */
// const PENNDING = 'pending'
// const FULFILLED = 'fulfilled'
// const REJECTED = 'rejected'
// class MyPromise {
//   constructor(executor) {
//     this.status = PENNDING
//     this.value = undefined
//     this.reson = undefined
//     const resovle = ()=>{
//       if
//     }
//     executor()
//   }
// }
// const mp = new MyPromise((resovle,rejected)=>{
//   resovle('成功调用')
//   // rejected('失败调用')
// })
new Promise((resolve, reject) => {
  resolve('成功调用')
})
import { ref, computed } from 'vue'

const handleSubmit = () => {
  console.log(selected.value, 'selected.value')
}
const rawOptions = ref([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '梨子', value: 'pear' },
])

// 添加伪选项：全选 / 反选
const specialOptions = ref([
  { label: '🟢 全选', value: '__SELECT_ALL__' },
  { label: '🔄 反选', value: '__INVERT_SELECT__' },
])

const renderedOptions = computed(() => [
  ...specialOptions.value,
  ...rawOptions.value,
])

const selected = ref([])

const handleChange = (val, ...args) => {
  console.log(val, args, 'val, args')
  // 判断是否包含特殊选项
  if (val.includes('__SELECT_ALL__')) {
    selected.value = rawOptions.value.map(item => item.value)
  } else if (val.includes('__INVERT_SELECT__')) {
    const all = rawOptions.value.map(item => item.value)
    selected.value = all.filter(v => !selected.value.includes(v))
  } else {
    selected.value = val
  }
  console.log(selected.value, 'selected.value')

}
</script>
