<!-- CheckInTask.vue -->

<template>
  <div v-if="showPanel" class="panel">
    <!-- 面板内容 -->
    <p>这是面板的内容</p>
    <!-- 关闭按钮 -->
    <button @click="hidePanel">关闭面板</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showPanel = ref(false);

const hidePanel = () => {
  showPanel.value = false;
};
</script>

<style scoped lang="scss">
.panel {
  position: fixed;
  border: 1px solid #ccc;
  padding: 10px;
  bottom: 0;
}
</style>
