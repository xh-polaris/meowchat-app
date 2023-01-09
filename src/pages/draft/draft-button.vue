<template>
  <navigator v-if="type === 'moment'" url="/pages/draft/draft-moment">
    <view class="button"> + </view>
  </navigator>
  <navigator v-if="type === 'post'" url="/pages/draft/draft-post">
    <view class="button"> + </view>
  </navigator>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default() {
      return "moment";
    },
  },
});
const type = ref(props.type);
</script>

<style lang="scss" scoped>
.button {
  position: fixed;
  right: calc(20 / 390 * 100vw);
  bottom: calc(20 / 390 * 100vw);
  z-index: 100;

  background-color: #1fa1ff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.25);
  width: calc(48 / 390 * 100vw);
  height: calc(48 / 390 * 100vw);
  border-radius: 50%;
  color: #eeeeee;
  font-family: sans-serif;
  line-height: calc(48 / 390 * 100vw);
  text-align: center;
  font-size: calc(40 / 390 * 100vw);
}

.button:active {
  color: #ccc;
}
</style>
