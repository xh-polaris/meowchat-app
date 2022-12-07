<template>
	<view class="container">
		<image class="bg-set" src="https://static.xhpolaris.com/profile_background.png" />
		<view class="intro">
			 您好，我们是华东师范大学小动物保护协会
		</view>
		<view class="intro1">
			  感谢您选择领养代替购买，但养猫的实际情况可能会和您想象的不太一样，请扫描下方二维码阅读全部内容，认真考虑是否领养，并如实填写问卷
		</view>
		<view class="QRcode_content">
			<image class="QRcode" src="/static/images/QRcode.png"  style=" width: 376rpx;" mode="widthFix" />
		</view>
		<view class="link_content">
			<text class="title">问卷链接：</text>
			<navigator url="/pages/profile/apply_adopt_questionnaire" hover-class="none">
			<view class="link">
				https://www.wjx.cn/vj/mBnSgB8.aspx 
			</view>
			</navigator>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.bg-set {
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  top: 0;
	  left: 0;
	  z-index: -1;
	}
	.intro {
	  text-align: center;
	  margin-top:30rpx;
	  margin-right: 51rpx;
	  margin-left:54rpx;
	  font-size: 30rpx;
	}
	.intro1 {
		text-align: center;
		margin-right: 51rpx;
		margin-left:54rpx;
		font-size: 30rpx;
	}
	.QRcode_content{
		box-shadow: 0 0 10rpx #EEEEEE;
		margin: 60rpx;
		padding: 20rpx;
		margin-top:50rpx;
		margin-bottom: 10rpx;
		border-radius: 21rpx;
		background-color: #FFFFFF;	
		vertical-align: middle;
		text-align: center;
		.QRcode{
			margin-top: 100rpx;
			margin-bottom: 100rpx;	
		}
	}
	.link_content{
		box-shadow: 0 0 10rpx #EEEEEE;
		margin: 60rpx;
		padding: 20rpx;
		margin-top:50rpx;
		margin-bottom: 10rpx;
		border-radius: 21rpx;
		background-color: #FFFFFF;	
		vertical-align: middle;
		text-align: center;
		flex-flow: row;
		display: flex;
		.title{
			font-weight: bold;
			font-size: 25rpx;
		}
		.link{
			color: #007BFF;
			font-weight: bold;
			font-size: 25rpx;
		}
	}
</style>