<template>
  <div class="editor-container">
    <div class="toolbar">
      <button @click="formatText('bold')">加粗</button>
      <button @click="formatText('italic')">斜体</button>
      <button @click="formatText('underline')">下划线</button>
      <button @click="createList('ordered')">有序列表</button>
      <button @click="createList('unordered')">无序列表</button>
      <button @click="insertImage">插入图片</button>
      <button @click="insertVideo">插入视频</button>
      <button @click="insertAudio">插入音频</button>
    </div>

    <div class="editor" contenteditable="true" data-placeholder="给ChatGPT发送消息" ref="editorRef" @input="handleInput">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const editorRef = ref<HTMLElement | null>(null);

// 格式化文本
const formatText = (format: 'bold' | 'italic' | 'underline') => {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement('span');

  switch (format) {
    case 'bold':
      span.style.fontWeight = 'bold';
      break;
    case 'italic':
      span.style.fontStyle = 'italic';
      break;
    case 'underline':
      span.style.textDecoration = 'underline';
      break;
  }

  span.appendChild(range.extractContents());
  range.insertNode(span);
  selection.removeAllRanges();
};

// 创建列表
const createList = (type: 'ordered' | 'unordered') => {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;

  const range = selection.getRangeAt(0);
  const list = document.createElement(type === 'ordered' ? 'ol' : 'ul');
  const listItem = document.createElement('li');

  listItem.appendChild(range.extractContents());
  list.appendChild(listItem);
  range.insertNode(list);
  selection.removeAllRanges();
};

// 插入图片
const insertImage = () => {
  const url = prompt("请输入图片链接地址:");
  if (url && editorRef.value) {
    const img = document.createElement('img');
    img.src = url;
    img.alt = "插入的图片";
    img.style.maxWidth = '100%';
    img.style.margin = '10px 0';

    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      range.insertNode(img);
      range.collapse(false);
    }
  }
};

// 插入视频
const insertVideo = () => {
  const url = prompt("请输入视频链接地址 (支持 MP4):");
  if (url && editorRef.value) {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.style.maxWidth = '100%';
    video.style.margin = '10px 0';

    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      range.insertNode(video);
      range.collapse(false);
    }
  }
};

// 插入音频
const insertAudio = () => {
  const url = prompt("请输入音频链接地址 (支持 MP3):");
  if (url && editorRef.value) {
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    audio.style.margin = '10px 0';

    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      range.insertNode(audio);
      range.collapse(false);
    }
  }
};

// 处理输入事件
const handleInput = () => {
  console.log('输入事件触发', '123');

  if (!editorRef.value?.textContent && editorRef.value) {
    editorRef.value.innerHTML = '<br>';
  }
};
</script>

<style scoped lang="scss">
.editor-container {
  border: 1px solid #ddd;
  font-family: Arial, sans-serif;
  text-align: left;
}

.toolbar {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #f4f4f4;
  border-bottom: 1px solid #ddd;
}

.toolbar button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}

.toolbar button:hover {
  background: #eee;
}

.editor {
  min-height: 200px;
  padding: 10px;
  outline: none;
  position: relative;

  &:empty:before {
    content: attr(data-placeholder);
    color: #999;
    position: absolute;
    pointer-events: none;
  }
}
</style>
