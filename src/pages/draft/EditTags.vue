<template>
  <view class="tags">
    <template v-for="(tag, index) in tags" :key="tag">
      <view class="tag" @click="removeTag(index)">{{ "#" + tag }}</view>
    </template>
  </view>

  <view v-if="tags.length" class="prompt"
    >点击已有tag即可删除 tag上限为3个 不可重复</view
  >
  <view class="add-tags">
    <view v-if="isEditingInput" class="button" @click="finishEdit"
      >确认添加</view
    >
    <view v-else class="button" @click="startEdit">添加tag</view>
    <input
      v-if="isEditingInput"
      v-model="inputText"
      placeholder="tag不能为空"
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
    border-radius: 1vw;
    padding: 0 0.8vw;
    border: 1px solid #3a3a3a;
    font-size: 4.7vw;
    margin-right: 2vw;
    margin-bottom: 1vw;
  }
}
.prompt {
  font-size: 3vw;
  color: #3a3a3a;
  margin-bottom: 1vw;
}
.add-tags {
  display: flex;
  .button {
    box-sizing: border-box;
    height: 10vw;
    line-height: 10vw;
    width: fit-content;
    padding: 0 3vw;
    border-radius: 1vw;
    background-color: #1fa1ff;
    color: white;
    &:active {
      filter: brightness(80%);
    }
    margin-right: 3vw;
  }
  .input {
    border: 1px solid #bbbbbb;
    border-radius: 1vw;
    box-sizing: border-box;
    width: 40vw;
    font-size: 4.6vw;
    padding: 0 4vw;
    height: 10vw;
  }
}
</style>
