<template>
  <div class="card">
    <img :src="Icons.CatExample" class="image-cat" />

    <p class="title">帮助怂怂完成绝育手术</p>
    <p class="date">2023-9-25</p>

    <div class="fish-count">
      <img :src="Icons.LittleFish" class="image-fish" />
      <p class="count">×15</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
</script>

<style scoped lang="scss">
.card {
  background-color: white;
  border-radius: 3vw;
  width: 44vw;
  height: 52vw;
  margin: 0 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2vw;
  box-sizing: border-box;

  .image-cat {
    width: 40vw;
    height: 29vw;
    border-radius: 2vw;
    margin-bottom: 1vw;
  }

  .title {
    font-size: 3.5vw;
    color: black;
    font-weight: bold;
    letter-spacing: 0.3vw;
  }

  .date {
    font-size: 3vw;
    color: grey;
    letter-spacing: 0.3vw;
    margin-bottom: 1vw;
  }

  .fish-count {
    display: flex;
    .image-fish {
      width: 7vw;
      height: 7vw;
    }
    .count {
      width: fit-content;
      font-size: 4.5vw;
      color: brown;
    }
  }
}
</style>
