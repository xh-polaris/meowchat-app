<template>
  <div class="cell-bar">
    <div class="label">{{ props.label }}</div>
    <input class="input" type="text" :placeholder="props.placeHolder" />
  </div>
  <div v-if="props.hasBottomLine" class="bottom-line" />
</template>

<script setup lang="ts">
interface Props {
  label: string;
  placeHolder: string;
  hasBottomLine: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  label: "",
  placeHolder: "",
  hasBottomLine: false
});
</script>

<style scoped lang="scss">
.cell-bar {
  box-sizing: border-box;
  width: 88vw;
  margin-left: 6vw;
  display: flex;
  height: 10vw;
  align-items: center;
  .label {
    width: 28vw;
  }
  .input {
    width: 60vw;
    height: 10vw;
  }
}
.bottom-line {
  box-sizing: border-box;
  width: 88vw;
  margin-left: 6vw;
  border-bottom: 1px solid #dedede;
}
</style>
