<template>
	<view class="container">
		<image class="bg-set" src="https://static.xhpolaris.com/profile_background.png" />
		<view class="managerlist-wrap">
		<view v-for="(item, index) in managerList" :key="index" class="manager-wrap">
			<view class="info-wrap">
				<image class="avatar" mode="aspectFill" :src="item.avatar"></image>
				<view class="right">
					<view class="name">{{item.name}}</view>
					<view class="position">{{item.position}}</view>
					<view class="content">
						<view class="info">微信:  {{item.wechat}}</view>
						<image class="copy" src="/static/images/copy.png" @click="CopyToClipboard(item.wechat)"
						style="width:7%;"
						mode="widthFix"
						/>
						</view>
					<view class="content">
						<view class="info">电话:  {{item.phoneNumber}}</view>
						<image class="copy" src="/static/images/copy.png" @click="CopyToClipboard(item.phoneNumber)"
						style="width:7%;"
						mode="widthFix"
						/>
						</view>
					</view>
					</view>
				</view>
			</view>
			</view>
</template>

<script lang="ts" setup>
	import {CopyToClipboard} from "@/pages/profile/event"
	const managerList = [
	  {
	    avatar: "https://static.xhpolaris.com/profile_background.png",
	    name: "林霁",
		position:"开发负责人",
		wechat:"123456789",
		phoneNumber:"987654321",
	  },
	  {
	    avatar: "https://static.xhpolaris.com/profile_background.png",
	    name: "敖凌越",
	    position:"闵行本科生公寓负责人",
	    wechat:"123456789",
	    phoneNumber:"987654321",
	  }
	]		
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
	.managerlist-wrap{
		margin-top:150rpx;
	.manager-wrap {
		box-shadow: 0 0 10rpx #EEEEEE;
		margin: 60rpx;
		padding: 20rpx;
		margin-top:30rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx;
	    background-color: #FFFFFF;
		.info-wrap {
			display: flex;
			margin-bottom: 10rpx;
			.avatar {
				margin-top: 30rpx;
				float: left;
				margin-left: 10rpx;
				margin-right: 30rpx;
				height: 92rpx;
				width: 92rpx;
				border-radius: 50%;
			}
			.right {
				margin-top: 35rpx;
				margin-left: 20rpx;
				.name {
				font-size: 35rpx;
				margin-bottom: 13rpx;
				font-weight: bold;
				}
        .position{
					font-size: 25rpx;
					margin-bottom: 33rpx ;
					color: #939393;
				}
				.content {
					 height: 30rpx;
					 display: flex;
					.info{
						margin-top: 10rpx;
						font-size :35rpx;
						float:left;
						height:30rpx;
						width:350rpx;
					}
					.copy {
					  width: 30rpx;
					  height: 30rpx;
					  right: 30rpx;
					  margin-top: 15rpx;
					  float:right;
					}
					border-top: 1px solid #EEEEEE;
					margin-bottom: 60rpx;
				}
			}			
		}
	}
	}
	
</style>