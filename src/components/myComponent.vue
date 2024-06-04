<template>
  <div>
    <a-button>点我{{ props }}</a-button>
    <slot></slot>
    <!-- <slot name="mybtn"></slot> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})
console.log(props, 'props');

</script>

<style scoped lang="scss"></style>