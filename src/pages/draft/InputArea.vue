<template>
  <input
    v-model="title"
    type="text"
    placeholder="填写标题会有更多赞噢~"
    class="input"
  />
  <view class="textarea-frame">
    <textarea
      v-model="content"
      placeholder="说点什么吧"
      class="textarea"
      maxlength="2000"
    ></textarea>
    <view class="count">{{ content.length }}/2000</view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const emits = defineEmits(["changeTitle", "changeContent"]);
// interface Props {
//   title: object;
//   content: object;
// }
// const props = defineProps<Props>();
const title = ref("");
const content = ref("");
watch(title, (newTitle) => {
  emits("changeTitle", newTitle);
});
watch(content, (newContent) => {
  emits("changeContent", newContent);
});
</script>

<style scoped lang="scss">
.input,
.textarea {
  box-sizing: border-box;
  width: 88vw;
  //font-size: 4.6vw;
  margin-left: 6vw;
  //border: 1px solid #bbbbbb;
  //background-color: #f7f9fd;
  //border-radius: 1vw;
}
.input {
  margin-bottom: 3vw;
  border-bottom: 1px solid #dedede;
  //padding: 0 4vw;
  height: 10vw;
}
.textarea {
  height: 72vw;
  resize: none;
  padding: 0 0 8vw 0;
  //padding: 2vw 4vw 8vw 4vw;
}
.textarea-frame {
  position: relative;
  .count {
    color: #cccccc;
    font-size: 3vw;
    position: absolute;
    right: 8vw;
    bottom: 2vw;
  }
}
</style>
