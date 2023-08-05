<template>
  <view v-if="isShow" class="popup">
    <view class="dialog">
      <view class="title">个人信息保护政策</view>
      <view class="text"
        >本政策是MeowChat小程序开发者
        "上海玄虹网络科技有限公司"（以下简称“开发者”）为处理你的个人信息而制定。您可以自由选择是否使用本程序，您对本服务的登录、查看、发布信息等行为即视为已阅读并同意本条款的约束。
        <br />
        一、隐私政策
        <br />
        1.1保护用户隐私是的MeowChat一项基本政策，MeowChat保证不对外公开或向第三方提供您的注册资料及您在使用网络服务时存储在MeowChat的非公开内容，但下列情况除外：（1）事先获得用户的明确授权；（2）根据有关的法律法规要求；（2）按照相关政府主管部门的要求；（3）为维护社会公众的利益；（4）为维护MeowChat的合法权益。
        <br />
        2.2当MeowChat与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方允诺严格承担与MeowChat同等的保护用户隐私的责任，则视为您授权MeowChat将包含个人注册资料在内的相关信息仅提供给该等第三方。
        <br />
        二、开发者处理的信息
        <br />
        根据法律规定，开发者仅处理实现小程序功能所必要的信息。
        <br />
        2.1为了展示你发布的动态和照片，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
        <br />
        2.2开发者收集你选中的照片或视频信息，用于在发布猫咪照片时展示。
        <br />
        2.3开发者收集你选中的文件，用于在动态中展示。
        <br />
        2.4对于小程序管理员，为了方便其他用户联系到你，开发者将在获取你的明示同意后，收集你的手机号。
        <br />
        2.5对于小程序管理员，为了方便其他用户联系到你，开发者将在获取你的明示同意后，收集你的微信号。
        <br />
        三、你的权益
        <br />
        3.1关于收集你的微信昵称、头像、收集你选中的照片或视频信息、收集你选中的文件，你可以通过以下路径：小程序主页右上角“...”
        — “设置” — “小程序已获取的信息” — 点击特定信息 —
        点击“通知开发者删除”，开发者承诺收到通知后将删除信息。
        <br />
        3.2关于你的个人信息，你可以通过以下方式与开发者联系，行使查阅、复制、更正、删除等法定权利。微信号：lj13958319703
        <br />
        四、信息存储
        <br />
        开发者承诺，除法律法规另有规定外，开发者对你的信息的保存期限应当为实现处理目的所必要的最短时间。
        <br />
        五、信息的使用规则
        <br />
        5.1开发者将会在本指引所明示的用途内使用收集的信息。
        <br />
        5.2如开发者使用你的信息超出本指引目的或合理范围，开发者必须在变更使用目的或范围前，再次以小程序通知方式告知并征得你的明示同意。
        <br />
        六、信息对外提供
        <br />
        6.1开发者承诺，不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接征得或确认第三方征得你的单独同意。
        <br />
        6.2开发者承诺，不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的单独同意。
        <br />
        七、违约及投诉
        <br />
        如果你认为开发者未遵守上述约定，或有其他的投诉建议、或未成年人个人信息保护相关问题，可通过以下方式与开发者联系；或者向微信进行投诉。微信号
        : 13958319703
      </view>
      <view class="confirm" @click="closeText"> 我已确认个人信息保护政策</view>
      <view class="cancel" @click="goBack"> 我再想想</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Pages } from "@/utils/url";

const isShow = ref(true);

function closeText() {
  isShow.value = !isShow.value;
}

function goBack() {
  uni.reLaunch({
    url: Pages.Community
  });
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(190, 190, 190, 0.8);

  .dialog {
    position: relative;
    display: grid;
    margin-top: 170rpx;
    margin-left: 32rpx;
    width: 92%;
    height: 85%;
    border-radius: 50rpx;
    opacity: initial;
    background-color: #fafcff;

    .title {
      position: relative;
      text-align: center;
      font-weight: bold;
      letter-spacing: 3rpx;
      margin-top: 25rpx;
      margin-bottom: 25rpx;
      font-size: 38rpx;
    }

    .text {
      overflow: scroll;
      text-indent: 1em;
      font-size: 20rpx;
      margin-left: 30rpx;
      margin-right: 30rpx;
      padding: 10rpx 20rpx 10rpx 20rpx;
      height: 90%;
      color: #696969;
      background-color: #f2f2f2;
    }

    .confirm {
      position: relative;
      text-align: center;
      font-size: 30rpx;
      margin: -70rpx 100rpx 15rpx;
      padding: 10rpx 50rpx 10rpx 50rpx;
      border-radius: 25rpx;
      letter-spacing: 2rpx;
      color: #ffffff;
      background-color: #1fa1ff;
    }

    .cancel {
      position: relative;
      text-align: center;
      font-size: 30rpx;
      margin-bottom: 30rpx;
      margin-left: 100rpx;
      margin-right: 100rpx;
      padding: 10rpx 50rpx 10rpx 50rpx;
      border-radius: 25rpx;
      letter-spacing: 2rpx;
      color: #bdbdbd;
      background-color: #eeeeee;
    }
  }
}
</style>
