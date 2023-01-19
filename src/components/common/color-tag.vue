<template>
  <view
    class="px-2 py-1 border d-inline-block m-1"
    :style="getStyle"
    style="border-radius: 20upx"
  >
    {{ item.name }}
  </view>
</template>

<script>
export default {
  props: {
    item: Object,
    color: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getStyle() {
      let color = {
        borderColor: ["#eea6aa", "#98d5d8", "#9dbe93", "#bccd99", "#EAD6BC"],
        background: ["#f8eae9", "#e8f6f6", "#e4f5e2", "#f2f6e8", "#FCE8CE"]
      };
      let index = Math.floor(Math.random() * color.borderColor.length);
      let borderColor = color.borderColor[index];
      let bgColor = color.background[index];
      return `background:${bgColor};border-color:${borderColor}`;
    }
  }
};
</script>

<style></style>
