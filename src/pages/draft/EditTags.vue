<template>
  <view class="tags">
    <template v-for="(tag, index) in tags" :key="tag">
      <view class="tag" @click="removeTag(index)">{{ "#" + tag }}</view>
    </template>
    <view
      v-if="!isEditingInput && tags.length <= 2"
      class="tag add"
      @click="startEdit"
      >添加tag</view
    >
    <view v-if="isEditingInput" class="tag add" @click="finishEdit"
      >确认添加</view
    >
  </view>

  <view v-if="tags.length && !isEditingInput" class="prompt"
    >Tips: 点击tag以删除</view
  >
  <view class="add-tags">
    <!--    <view v-if="isEditingInput" class="button" @click="finishEdit"-->
    <!--      >确认添加</view-->
    <!--    >-->
    <!--    <view v-else class="text-button" @click="startEdit">[无tag]</view>-->
    <input
      v-if="isEditingInput"
      v-model="inputText"
      placeholder="tag不可为空或重复"
      type="text"
      class="input"
      maxlength="20"
    />
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
const tags = reactive<string[]>([]);
const isEditingInput = ref(false);
const inputText = ref("");
const emits = defineEmits(["changeTags"]);
const startEdit = () => {
  if (tags.length >= 3) return;
  isEditingInput.value = true;
};
const finishEdit = () => {
  if (inputText.value === "") return;
  if (tags.includes(inputText.value)) return;
  tags.push(inputText.value);
  inputText.value = "";
  isEditingInput.value = false;
  console.log([...tags]);
  emits("changeTags", [...tags]);
};
const removeTag = (index: number) => {
  tags.splice(index, 1);
};
</script>

<style scoped lang="scss">
.tags,
.prompt,
.add-tags {
  margin: 0 6vw;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  .tag {
    height: 8vw;
    line-height: 8vw;
    border-radius: 4vw;
    font-size: 3vw;
    padding: 0 3vw;
    //border: 1px solid #3a3a3a;
    //font-size: 4.7vw;
    margin-right: 2vw;
    margin-bottom: 1vw;
    color: #aeaeae;
    background-color: #f5f5f5;
    &.add {
      font-size: 4vw;
      background-color: #afafaf;
      color: white;
    }
  }
  //.add {
  //  height: 8vw;
  //  width: 8vw;
  //  border-radius: 4vw;
  //  background-color: #f5f5f5;
  //}
}
.prompt {
  font-size: 3vw;
  line-height: 5vw;
  color: #c5c5c5;
  margin-bottom: 1vw;
  animation-name: vanish;
  animation-duration: 1.6s;
  animation-fill-mode: forwards;
  overflow: hidden;
  height: 5vw;
}
@keyframes vanish {
  0% {
    height: 5vw;
  }
  90% {
    height: 5vw;
  }
  100% {
    height: 0;
  }
}
.add-tags {
  display: flex;
  .text-button {
    color: #696969;
    width: fit-content;
  }
  .button {
    box-sizing: border-box;
    height: 8vw;
    line-height: 8vw;
    //color: #696969;
    width: fit-content;
    padding: 0 3vw;
    border-radius: 4vw;
    background-color: #1fa1ff;
    color: white;
    &:active {
      filter: brightness(80%);
    }
    margin-right: 3vw;
  }
  .input {
    //border: 1px solid #bbbbbb;
    //border-radius: 1vw;
    //box-sizing: border-box;
    border-bottom: 1px solid #eaeaea;
    width: 40vw;
    //font-size: 4.6vw;
    //padding: 0 4vw;
    line-height: 10vw;
    height: 10vw;
  }
}
</style>
