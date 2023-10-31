<template>
    <div class="card">
        <div class="card-content">
            <img :src="Icons.CatExample" mode="scale to Fill" class="image-cat">
        </div>

        <div class="card-text">
            <p class="title">帮助怂怂完成绝育手术</p>
            <p class="date">2023-9-25</p>
        </div>

        <div class="fish-count">
            <img :src="Icons.LittleFish" mode="scale to Fill" class="image-fish">
            <p class="count">×15</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {Icons} from "@/utils/url"
</script>


<style scoped lang="scss">
.card {
    background-color: white;
    border-radius: 3vw;
    width: 44vw;
    height: 52vw;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .card-content {
        padding: 10px;

        .image-cat {
            width: 40vw;
            height: 29vw;
            display: block;
            border-radius: 2vw;
            margin: 1vw;
            position: relative;
            left: -2.2vw;
            top: -2vw;
        }
    }

    .card-text {
        padding: 3vw;
        position: relative;
        top: -7vw;
        left: -1vw;

        .title{
            font-size: 3.5vw;
            color: black;
            font-weight: bold;
            letter-spacing: 0.3vw;
        }

        .date{
            font-size: 3vw;
            color: grey;
            top: 0.8vw;
            position: relative;
            letter-spacing: 0.3vw;
        }
    }
}


.fish-count{
    position: relative;
    top: -0.2vw;

    .image-fish{
        position: relative;
        width: 7vw;
        height: 7vw;
        display: block;
        left: 2vw;
        top: -8vw;
    }

    .count{
        position: relative;
        left: 9vw;
        top: -15vw;
        font-size: 4.5vw;
        color: brown;
    }
}


</style>
