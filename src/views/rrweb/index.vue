<template>
  <main>
    <header>
      <a-button @click="onRecord" type="primary">录制</a-button>
      <a-button @click="onReplay" type="success">回放</a-button>
      <a-button @click="goBack">清空</a-button>
    </header>
    <!-- 展示回放的DOM -->
    <section v-if="showReplay" ref="replayer"></section>
    <!-- 表单 -->
    <section v-else>
      <a-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        label-width="auto"
      >
        <a-form-item label="用户名">
          <a-input v-model="ruleForm.name" autocomplete="off" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item label="年龄">
          <el-input v-model.number="ruleForm.age" />
        </a-form-item>
        <a-form-item style="margin-left: 55px">
          <a-button type="primary"> 提交 </a-button>
          <a-button>重置</a-button>
        </a-form-item>
      </a-form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRecord } from './use-records';
import 'rrweb-player/dist/style.css';

const { replayer, showReplay, onRecord, onReplay, goBack } = useRecord();

const ruleFormRef = ref();
const ruleForm = reactive({
  pass: '',
  name: '',
  age: '',
});
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  header {
    margin-bottom: 20px;
  }
  section {
    border: 1px solid rgb(198, 194, 194);
    padding: 20px;
    border-radius: 4px;
  }
}
</style>

