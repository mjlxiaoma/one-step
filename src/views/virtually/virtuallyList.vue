<template>
  <div>
    <div class="item" v-for="(item, i) in drag.list" :key="item.id" draggable="true" @dragstart="dragstart($event, i)"
      @dragenter="dragenter($event, i)" @dragend="dragend" @dragover="dragover">
      {{ item.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const drag = reactive({
  list: [
    { name: 'a', id: 1 },
    { name: 'b', id: 2 },
    { name: 'c', id: 3 },
    { name: 'd', id: 4 },
    { name: 'e', id: 5 },
  ]
})

let dragIndex = 0

function dragstart(e, index) {
  e.stopPropagation()
  dragIndex = index
  setTimeout(() => {
    e.target.classList.add('moveing')
  }, 0)
}
function dragenter(e, index) {
  e.preventDefault()
  // 拖拽到原位置时不触发
  if (dragIndex !== index) {
    const source = drag.list[dragIndex];
    drag.list.splice(dragIndex, 1);
    drag.list.splice(index, 0, source);

    // 更新节点位置
    dragIndex = index
  }
}
//dragover事件在可拖动的元素或者被选择的文本被拖进一个有效的放置目标时（每隔几十秒）触发
function dragover(e) {
  console.log(e,'e')
  // e.preventDefault()
  // e.dataTransfer.dropEffect = 'move'
}
//dragend事件在拖放操作结束时触发（通过释放鼠标按钮或单击退出键）
function dragend(e) {
  console.log(e,'e');
  e.target.classList.remove('moveing')
}
</script>

<style lang="scss" scoped>
.item {
  width: 200px;
  height: 40px;
  line-height: 40px;
  // background-color: #f5f6f8;
  background-color: skyblue;
  text-align: center;
  margin: 10px;
  color: #fff;
  font-size: 18px;
}

.container {
  position: relative;
  padding: 0;
}

.moveing {
  opacity: 0;
}
</style>
