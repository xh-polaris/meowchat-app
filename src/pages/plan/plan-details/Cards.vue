<template>
    <div class="card1">
        <div class="title">帮助<text style="color:#1f5eff">怂怂</text>完成绝育手术</div>

        <div class="category">
            <view class="category-style">
                <text class="category-content">生理健康</text>
            </view>
            <view class="category-style">
                <text class="category-content">绝育手术</text>
            </view>
        </div>

        <div class="content">具体说明小鱼干计划的详情介绍，如生病时介绍病情。
            具体说明小鱼干计划的详情介绍，如生病时介绍病情。具体说明小鱼干计划的详情介绍，如生病时介绍病情。</div>
    </div>

    <div class="card2">
        <div class="title-target">
            <text class="target">目标小鱼干： 100</text>
            <img :src="Icons.LittleFish" class="small-icon"/>
        </div>

        <view class="time">募集时间： 2023/11/03-2023/12/03</view>

        <div class="dialog-box">
            <img :src="Icons.DialogBox" class="box" />
            <view class="dialog-content">
                还差<text style="color: blue">32</text>小鱼干
            </view>
        </div>

        <view class="progress-box">
            <view class="progress" :style="{width: pogressWitdh + '%'}"></view>
        </view>

        <view class="implication">已获得68小鱼干助力，还需要32小鱼干</view>
    </div>

    <div class="card3">
        <text class="card3-title">执行说明</text>
        <br />
        <text class="card3-details">执行时间：2023年12月15日起</text>
        <br />
        <text class="card3-details">执行地点：猫猫狗狗宠物医院</text>
        <br />
        <text class="card3-details">执行人员：华东师范大学动物保护社团成员</text>
    </div>

</template>

<script setup lang="ts">
import { Icons } from "@/utils/url";
</script>

<style scoped lang="scss">
.card1 {
    border-radius: 2vw;
    height: 44.1vw;
    width: 91.7vw;
    background-color: white;
    flex-direction: row;
    margin: 4vw;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 1vw;

    .title {
        font-size: 4.5vw;
        letter-spacing: 0.4vw;
        font-weight: bold;
        margin-left: 5vw;
        margin-top: 4vw;
        writing-mode: horizontal-tb;
        text-align: left;
        margin-bottom: 2vw;
    }

    .category {
        display: flex;
        width: 91.7vw;
        margin-bottom: 4.5vw;
        margin-left: 5vw;
        height: 7.2vw;

        .category-style {
            font-size: 3.5vw;
            letter-spacing: 0.4vw;
            font-weight: bold;
            padding: 0.5vw 1.5vw;
            margin-right: 3vw;
            border: 0.7vw solid transparent;
            border-radius: 1vw;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(to right, #fff, #fff),
            linear-gradient(to right,  #0000FF, #1E90FF);
        }

        .category-content{
            background: linear-gradient(to right,  #0000FF, #1E90FF);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

    }

    .content {
        font-size: 3vw;
        letter-spacing: 0.4vw;
        color: grey;
        margin-left: 5vw;
        margin-right: 3vw;
        display: flex;
        text-align: left;
    }
}


.card2 {
    border-radius: 2vw;
    height: 44.1vw;
    width: 91.7vw;
    background-color: white;
    flex-direction: row;
    margin: 4vw;
    justify-content: space-between;
    box-sizing: border-box;
    padding-top: 5vw;
    padding-bottom: 5vw;
    padding-left: 0.8vw;
    padding-right: 0.8vw;

    .title-target {
        width: 100vw;
        display: flex;
        margin-bottom: 2.2vw;


        .target{
            font-size: 4.5vw;
            letter-spacing: 0.4vw;
            font-weight: bold;
            margin-left: 5vw;
            writing-mode: horizontal-tb;
            text-align: left;
        }

        .small-icon {
            height: 6vw;
            width: 6vw;
            margin-left: 1vw;
        }
    }

    .time {
        font-size: 3.5vw;
        letter-spacing: 0.4vw;
        color: grey;
        margin-left: 5vw;
        margin-top: 0;
        margin-bottom: 5vw;
    }

    .dialog-box {
        margin-bottom: 0;
        position: relative;

        .box{
            width: 35vw;
            height: 12vw;
            margin-left: 38vw;
            z-index: 0;
            margin-top: -2vw;
        }

        .dialog-content {
            font-size: 4vw;
            font-weight: bold;
            letter-spacing: 0.4vw;
            z-index: 1;
            margin-left: 42vw;
            position: relative;
            top: -11.5vw;
        }
    }

    .progress-box {
        margin-left: 5vw;
        margin-right: 5vw;
        width: 83vw;
        height: 2vw;
        border-radius: 1vw;
        background: #DCDCDC;
        margin-top: -5vw;

        .progress {
            width: 60vw;
            height: 2vw;
            background: linear-gradient(to right, #191970, #0000FF, #1E90FF);
            border-radius: 1vw;
        }
    }

    .implication {
        font-size: 3vw;
        letter-spacing: 0.1vw;
        color: grey;
        margin-left: 5vw;
        margin-top: 1.5vw;
        margin-bottom: 3vw;
    }
}

.card3 {
    border-radius: 2vw;
    height: 44.1vw;
    width: 91.7vw;
    background-color: white;
    flex-direction: row;
    margin: 4vw;
    justify-content: space-between;
    box-sizing: border-box;
    padding-top: 5vw;
    padding-bottom: 5vw;
    padding-left: 0.8vw;
    padding-right: 0.8vw;

    .card3-title {
        font-size: 4.5vw;
        letter-spacing: 0.4vw;
        margin-left: 5vw;
        font-weight: bold;
    }

    .card3-details {
        font-size: 3.3vw;
        letter-spacing: 0.3vw;
        color: grey;
        margin-left: 5vw;

    }
}
</style>