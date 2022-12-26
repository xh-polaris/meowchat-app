<template>
	<view class="container">
		<image class="bg-set" src="https://static.xhpolaris.com/profile_background.png" />
		<view class="content-wrap">
			<view class="title">写在前面</view>
			<image class="rightop" src="/static/images/apply_admin_rightop.png"/>
			    <view class="text">
					<view class="Blue">喵社区</view>
					<view class="Black">是一款致力于</view>
					<view class="Blue">流浪动物保护的非盈利性小程序</view>
					<view class="Black">社区的维护和建设需要依靠所有人的力量。因此我们需要一些小伙伴成为社区的管理员，一起维护小猫咪们的家。</view>
				</view>
				<view class="text">
					<view class="Black">喵社区的管理员分为普通管理员和最高管理员，最高管理员通常是动保的社长，只能通过权限转让来任命，而普通管理员可以是任何一位喜欢猫咪的小伙伴。</view>
				</view>
				<view class="text">
					<view class="Black">管理员负责喵社区</view>
					<view class="Blue">动态的审核和猫咪信息的维护</view>
					<view class="Black">，拥有修改猫咪信息、审核动态、删除动态的权限，如果你也想加入我们，请填写以下信息申请哦。</view>
				</view>
		</view>
		<view class="apply-wrap">
			<view class="input-wrap">
				<input class="uni-input" type="name" placeholder="  请填写你名字" placeholder-style="color: #B8B8B8;"/>
			</view>
			<cover-view class="input-wrap">
			    <textarea class="textarea-inherit" type="name" placeholder="请填写你的申请信息，如申请理由、个人介绍等" placeholder-style="color: #B8B8B8;">
				</textarea>
			</cover-view>
			<button type="primary" class="confirm">
				<view class="send">提交申请</view>
			</button>
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
	.content-wrap{
		box-shadow: 0 0 10rpx #EEEEEE;
		padding: 20rpx;
		margin-top:50rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-radius: 21rpx;
		background-color: #FFFFFF;
		.rightop{
				position: absolute;
				width:150rpx;
				height: 134rpx;
				left:570rpx;
				top:60rpx;
				}
		.title{
			font-weight: bold;
			font-size: 35rpx;
			margin-top: 30rpx;
			margin-left:10rpx;
			margin-bottom:60rpx;
		}
		.text{
			font-style: normal;
			font-weight: 500;
			font-size: 30rpx;
			line-height: 150%;
			letter-spacing: -0.3px;
			margin-top: 30rpx;
			margin-left:10rpx;
			margin-bottom:30rpx;
			.Blue{
				color: #1FA1FF;
				display:inline;	
			}
			.Black{
				color: black;
				display:inline;
			}
		}	
	}
	.apply-wrap{
		font-size:24rpx;
		box-shadow: 0 0 10rpx #EEEEEE;
		padding: 20rpx;
		margin-top:50rpx;
		margin-bottom: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-radius: 21rpx;
		background-color: #FFFFFF;	
		.input-wrap{
			font-size:24rpx;
			display: flex;
			background-color:#FAFAFA ;
			margin-left: 10rpx;
			margin-right: 10rpx;
			margin-top:10rpx;
			margin-bottom: 40rpx;
		}	
		.confirm{
			margin-top:30rpx;
			background-color: #1FA1FF;
			border-radius:30px;	
			height:88rpx;
			width:660rpx;
			.send{
			margin-top:-6rpx;
			height:44rpx;
			font-size: 36rpx;
			}
		}
	}
	
	 .textarea-inherit {
	        width: 100%;
	        overflow: auto;
	        word-break: break-all;  //解决兼容问题
	    }
</style>