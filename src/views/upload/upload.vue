<template>
  <div class="upload">
    <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange">
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
    </a-upload-dragger>
    <!-- <div style="font-size: 12px; transform: scale(0.5);width: 50%;height: 50%;">
      20人份/盒20人份/盒20人份/盒20人份/盒20人份/盒20人份/盒20人/盒20人份/盒</div>1312312312312312312-->
    <!-- 文本容器 -->

    <!-- <div class="container" style="width: 100px;">
      20人份/盒20人份/盒20人份/盒20 20人份/盒20人份/盒20人份/盒20
    </div> -->
  </div>
  <div class="container1">
    <!-- 文本内容 -->
    <p>
      20人份/盒20人份/盒20人份/盒20 20人份/盒20人份/盒20人份/盒20
    </p>
  </div>
  <a-input v-focus v-model:value="value"></a-input>
  <a-button @click="handleClick" type="primary"> 修改 </a-button>
  <button class="color">nihaoa</button>
  <input type="">
</template>
<script lang="ts" setup>
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { addFun } from 'mjlpackge'
console.log(addFun);

// import 'vue-cropper/dist/index.css'
// import { VueCropper } from 'vue-cropper'
// if (navigator.clipboard) {
//   navigator.clipboard.readText()
//     .then(text => console.log(text, 'text'))
//     .catch(error => console.log('获取剪贴板内容失败：', error));
// } else {
//   console.log('当前浏览器不支持Clipboard API');
// }
const value = ref('')
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

// export default defineComponent({
//   components: {
//     InboxOutlined,
//   },
//   setup() {
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
const handleChange = (info: FileInfo) => {
  console.log(info, 'info');

  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
//     return {
//       handleChange,
//       fileList: ref([]),
//       handleClick,
//       t_color,
//       b_color
//     };
//   },
// });
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