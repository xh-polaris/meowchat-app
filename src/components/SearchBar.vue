<template>
  <view class="search-bar">
    <view class="search-box">
      <input
        v-model="searchText"
        type="text"
        class="input"
        :placeholder="props.placeHolder"
      />
      <image
        class="clear-icon"
        mode="scaleToFill"
        :src="Icons.Cancel"
        @click="clear"
      ></image>
    </view>
    <view class="search-button" @click="search">搜索</view>
  </view>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
import { ref } from "vue";
interface Props {
  placeHolder: string;
}
const props = withDefaults(defineProps<Props>(), {
  placeHolder: "请输入搜索内容"
});
const searchText = ref("");
const emits = defineEmits(["clearSearch", "search"]);
const clear = () => {
  searchText.value = "";
  emits("clearSearch");
};
const search = () => {
  emits("search", searchText.value);
};
</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  margin-left: 3vw;
  .search-box {
    width: 82vw;
    display: flex;
    border: 0.6vw solid #1fa1ff;
    border-radius: 2vw 0 0 2vw;
    border-right: none;
    box-sizing: border-box;
    align-items: center;
    .input {
      width: 73vw;
      margin-left: 1vw;
    }
    .clear-icon {
      width: 4vw;
      height: 4vw;
      margin-left: 1.5vw;
    }
  }
  .search-button {
    width: 12vw;
    height: 8vw;
    border-radius: 0 2vw 2vw 0;
    box-sizing: border-box;
    background-color: #1fa1ff;
    color: #f5f7fa;
    text-align: center;
    line-height: 8vw;
  }
}
</style>
