<template>
  <div class="">
    我是子组件+{{ props.name }}
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
const props = defineProps({
  name: {
    type: String,
    default: '《父组件没有传递数据》'
  }
})



</script>
<style lang="scss" scoped></style>
