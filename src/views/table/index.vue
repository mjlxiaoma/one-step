<template>
  <a-table :columns="columns" :data-source="data" @resizeColumn="handleResizeColumn"></a-table>
  <div class="image-container">
    <img src="https://pic.rmb.bdstatic.com/bjh/events/3ab5144e9a8c30c09c791e235b4d56259570.png@h_1280"
      alt="Hover Image">
  </div>
  <div>
    <h1>requestAnimationFrame 动画示例</h1>
    <div class="animation-container">
      <div class="animated-box" :style="{ transform: `translateX(${position}px)` }"></div>
    </div>
    <button @click="startAnimation">开始动画</button>
    <button @click="pauseAnimation">{{ isPaused ? '继续动画' : '暂停动画' }}</button>
  </div>
</template>
<script lang="ts">
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

const position = ref(0);
const speed = ref(2); // 移动速度
const direction = ref(1); // 1 表示向右，-1 表示向左
let animationFrameId: number | null = null;
const isPaused = ref(false); // 动画是否暂停

const animate = () => {
  if (!isPaused.value) { // 只有在未暂停时才更新位置
    position.value += speed.value * direction.value; // 根据方向移动

    // 获取容器的宽度
    const container = document.querySelector('.animation-container') as HTMLElement;
    const containerWidth = container.clientWidth;
    const boxWidth = 50; // 方块的宽度

    // 检查是否到达边缘
    if (position.value > containerWidth - boxWidth) { // 到达右边缘，改变方向
      direction.value = -1;
    } else if (position.value < 0) { // 到达左边缘，改变方向
      direction.value = 1;
    }
  }

  animationFrameId = requestAnimationFrame(animate); // 继续动画
};

const startAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId); // 如果动画正在进行，先取消
  }
  position.value = 0; // 重置位置
  direction.value = 1; // 重置方向
  isPaused.value = false; // 确保动画未暂停
  animate(); // 开始动画
};

const pauseAnimation = () => {
  isPaused.value = !isPaused.value; // 切换暂停状态
};


function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`argument must be a array`)
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(value => {
        resolvedCounter++;
        resolvedResult[i] = value;
        if (resolvedCounter == promiseNum) {
          return resolve(resolvedResult)
        }
      }, error => {
        return reject(error)
      })
    }
  })
}
// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 3000)
})
promiseAll([p3, p1, p2]).then(res => {
  console.log(res) // [3, 1, 2]
})
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default defineComponent({
  components: {
  },
  setup() {
    const columns = ref<TableColumnsType>([
      {
        dataIndex: 'name',
        key: 'name',
        resizable: true,
        width: 150,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        resizable: true,
        width: 100,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        resizable: true,
        width: 150,
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        resizable: true,
        width: 150,
      },
      {
        title: 'Action',
        key: 'action',
        resizable: true,
        width: 150,
      },
    ]);
    return {
      data,
      columns,
      position,
      startAnimation,
      pauseAnimation,
      isPaused,
      handleResizeColumn: (w, col) => {
        console.log(w, col);
        col.width = w;
      },
    };
  },
});
</script>
<style scoped lang="scss">
.image-container {
  width: 300px;
  height: 200px;
  overflow: hidden;
  background-color: #000;
  border-radius: 8px;
  /* 圆角效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  /* 保持图片比例 */
  transition: all 0.4s;
  /* 平滑过渡效果 */
}

.image-container:hover img {
  transform: scale(1.2);
}

.animation-container {
  width: 500px;
  height: 200px;
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
}

.animated-box {
  width: 50px;
  height: 50px;
  background-color: #42b983;
  position: absolute;
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中 */
}
</style>