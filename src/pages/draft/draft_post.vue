<template>
  <view class="all">
    <view class="main">

      <input type="text" placeholder="输入标题" />
      <textarea type="text" maxlength="5000" placeholder="说点什么吧！&#10;内容编辑完成后，将通过2-3小时的审核时间，审核通过后即发布成功，请耐心等待" />

      <view class="images">
        <block v-for="(image) in imagesData" :key="image.id">
          <view class="added-image" />
        </block>
        <view class="new-image" />
      </view>
      <view class="image-num">
        {{ imagesData.length }}/8
      </view>

    </view>

    <view class="panel">
      <view class="toggle-bar">
        <view class="toggle-text">
          匿名信息
        </view>
        <view :class="'toggle '+(isAnonymous?'active':'')" @click="toggleAnonymous">
          <view class="toggle-capsule">
            <view class="toggle-circle" />
          </view>
        </view>
      </view>
      <view class="publish">
        发布帖子
      </view>
      <view class="notice">
        发布前请先阅读
        <navigator class="nobody-will-read" url="">
          《用户服务协议》
        </navigator>
        及
        <navigator class="nobody-will-read" url="">
          《个人信息保护政策》
        </navigator>
        ，一旦发布即被视为同意上述协议和政策
      </view>
    </view>
  </view>
</template>

<script setup>

import { reactive, ref } from "vue";

const imagesData = reactive([])

function addImageData() {
  imagesData.push({
    id: Math.random()
  })
}

const isAnonymous = ref(false)
const isSyncToCollection = ref(false)

function toggleAnonymous() {
  isAnonymous.value = !isAnonymous.value
}

function toggleSyncToCollection() {
  isSyncToCollection.value = !isSyncToCollection.value
}

const imageNum = Math.floor(Math.random() * 9)
for (let i = 0; i < imageNum; i++) {
  addImageData()
}

console.logg("语法错误测试")

</script>

<style lang="scss" scoped>

$margin: calc(20 / 390 * 100vw);
$imagesWidth: calc(100vw - $margin * 2);
$imageWidth: calc(110 / 390 * 100vw);
$imageGap: calc(($imagesWidth - 3 * $imageWidth) / 2);

body {
  font-family: sans-serif;
}

.all {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 48px);
}

.images {
  display: flex;
  width: calc(100vw - $margin * 2 + $imageGap);
  margin: $margin;
  margin-bottom: 0;
  flex-wrap: wrap;
}

.added-image, .new-image {
  box-sizing: border-box;
  width: $imageWidth;
  height: $imageWidth;
  border-radius: calc(6 / 390 * 100vw);
  margin-right: $imageGap;
  margin-bottom: $imageGap;
}

.added-image {
  background-color: #e1e1e1;
}


.new-image {
  background-color: #FAFAFA;
  border: #D1D1D1 solid calc(1 / 390 * 100vw);
  background-image: url("../../static/images/plus-lightgrey.png");
  background-size: 24% 24%;
  background-repeat: no-repeat;
  background-position: center center;
}

.image-num {
  font-size: calc(12 / 390 * 100vw);
  color: #B8B8B8;
  margin-left: calc(32 / 390 * 100vw);
  margin-bottom: calc(20 / 390 * 100vw);
}

input, textarea {
  background-color: #FAFAFA;
  border-radius: calc(10 / 390 * 100vw);
  width: calc(100vw - $margin * 2);
  box-sizing: border-box;
  margin: 0 $margin;
  padding: calc(10 / 390 * 100vw);
  color: black;
  font-size: calc(14 / 390 * 100vw);
}

input {
  margin-top: calc(20 / 390 * 100vw);
  margin-bottom: calc(10 / 390 * 100vw);
  height: calc(40 / 390 * 100vw);;
}

textarea {
  margin-bottom: calc(10 / 390 * 100vw);
}

textarea ::selection {
  background-color: #939393;
  color: white;
}
::placeholder {
  color: #939393;
}

.choose-cats-bar {
  display: flex;
  align-items: center;
  margin: 0 $margin;
  margin-bottom: calc(10 / 390 * 100vw);

  .choose-cats {
    color: #1FA1FF;
    font-size: calc(14 / 390 * 100vw);
    margin-right: calc(5 / 390 * 100vw);
  }

  .right-arrow {
    width: calc(7 / 390 * 100vw);
    height: calc(11 / 390 * 100vw);
    background-image: url("../../static/images/right-blue.png");
    margin-right: calc(16 / 390 * 100vw);
  }

  .choose-followed-cats {
    color: #B8B8B8;
    font-size: calc(12 / 390 * 100vw);
  }
}

.cat-names {
  display: flex;
  align-items: center;
  margin: 0 $margin;

  .cat-name {
    color: #939393;
    font-size: calc(14 / 390 * 100vw);
    border: #D1D1D1 calc(1 / 390 * 100vw) solid;
    line-height: calc(16 / 390 * 100vw);
    height: calc(16 / 390 * 100vw);
    border-radius: calc(8 / 390 * 100vw);
    padding: 0 calc(4 / 390 * 100vw);
    margin-right: calc(8 / 390 * 100vw);
    text-align: center;
    min-width: calc(36 / 390 * 100vw);


    &.selected {
      color: #1FA1FF;
      border: #1FA1FF calc(1 / 390 * 100vw) solid;
    }
  }
}

.panel {
  padding: calc(33 / 390 * 100vw);
  padding-bottom: calc(60 / 390 * 100vw);
}

.toggle-bar {

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: calc(8 / 390 * 100vw);

  .toggle-text {
    font-size: calc(14 / 390 * 100vw);
  }

  .toggle {
    .toggle-capsule {
      width: calc(38 / 390 * 100vw);
      height: calc(20 / 390 * 100vw);
      border-radius: calc(19 / 390 * 100vw);
      background-color: #EEEEEE;
      display: flex;
      align-items: center;
      transition-duration: 0.1s;

      .toggle-circle {
        width: calc(18 / 390 * 100vw);
        height: calc(18 / 390 * 100vw);
        margin-left: calc(1 / 390 * 100vw);
        border-radius: 50%;
        background-color: #FFFFFF;
        transition-duration: 0.1s;
      }
    }

    &.active {
      .toggle-capsule {
        background-color: #1FA1FF;
      }

      .toggle-circle {
        margin-left: calc(19 / 390 * 100vw);
      }
    }
  }
}

.publish {
  margin-top: calc(25 / 390 * 100vw);
  margin-bottom: calc(19 / 390 * 100vw);
  width: 100%;
  background-color: #1FA1FF;
  color: #FFFFFF;
  font-size: calc(16 / 390 * 100vw);
  text-align: center;
  height: calc(44 / 390 * 100vw);
  border-radius: calc(22 / 390 * 100vw);
  line-height: calc(44 / 390 * 100vw);
  transition-duration: 0.05s;
}

.publish:active {
  background-color: #BAE2FF;
}

.notice {
  font-size: calc(10 / 390 * 100vw);
}

.nobody-will-read {
  display: inline;
  color: #1FA1FF;
}

</style>