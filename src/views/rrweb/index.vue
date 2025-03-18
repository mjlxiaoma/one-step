<template>
  <a-layout>
    <a-layout-header>
      <a-button @click="startRecording" type="primary" :disabled="isRecording">开始录制</a-button>
      <a-button @click="stopRecording" type="default" v-if="isRecording">停止录制</a-button>
      <a-button @click="playRecording" v-if="events.length">播放录制</a-button>
    </a-layout-header>

    <a-layout-content style="padding: 20px;">
      <div class="form-container">
        <h2>表单操作示例</h2>
        <a-form @submit.prevent="handleSubmit">
          <a-form-item label="姓名">
            <a-input v-model="formData.name" placeholder="请输入姓名" />
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model="formData.email" placeholder="请输入邮箱" />
          </a-form-item>
          <a-form-item label="消息">
            <a-textarea v-model="formData.message" placeholder="请输入消息" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </div>

      <div ref="replayer" class="replay-container" v-if="showReplay"></div>
    </a-layout-content>
  </a-layout>
  <Chirld :name="name" />
  <div ref="div">1231</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRecord } from './use-records';
import Chirld from './components/Chirld.vue';
const { replayer, showReplay, onRecord, onReplay, goBack, isRecording, events } = useRecord();
const div = ref();
console.log(div.value, 'div.value');
console.log(window.innerWidth, 'window.innerWidth');
onBeforeMount(() => {
  console.log(div.value, 'div.value');
});
const name = ref('我是父组件传递的数据：我的名字叫哈哈哈');
const formData = ref({
  name: '',
  email: '',
  message: '',
});

const startRecording = () => {
  onRecord();
};

const stopRecording = () => {
  goBack();
};

const playRecording = () => {
  console.log('播放录制，事件列表:', events);
  onReplay();
};

const handleSubmit = () => {
  console.log('表单提交:', formData.value);
  // 这里可以添加表单提交的逻辑
};
</script>

<style scoped>
.form-container {
  margin: 20px 0;
}

.replay-container {
  width: 800px;
  height: 450px;
  border: 1px solid #ccc;
  margin: 20px auto;
  background: #f5f5f5;
}
</style>
