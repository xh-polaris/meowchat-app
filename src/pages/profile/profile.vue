<template>
  <view class="container">
    <image class="bg-set" src="https://static.xhpolaris.com/profile_background.png" />
    <view class="content">
      <!-- 用户信息：昵称、权限、单位 -->
      <view class="fot-xh">
        <view class="pic">
          <image
            src="https://static.xhpolaris.com/cat_world.jpg"
            style="width: 130rpx; height: 130rpx;border-radius: 50%;"
          />
        </view>
        <view class="txt">
          <view class="info">
            <view class="nickname">
              <text>nickname</text>
            </view>
            <view class="right">
              <text>管理员</text>
            </view>
            <view class="unit">
              <text>华东师范大学</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 功能栏 -->
      <view class="com-item">
        <view class="com-wrap">
          <view v-for="(item, index) in userOptions" :key="index" class="cell">
            <navigator :url="item.url" hover-class="none">
              <view class="cell-left">
                <image
                  class="cell-icon" :src="item.icon"
                  style="width: 70rpx;border-radius: 50%;"
                  mode="widthFix"
                />
                <view class="cell-text">
                  {{ item.title }}
                </view>
                <image class="arrow" src="/static/images/arrow_right.png" />
              </view>
              <view class="iconfont" />
            </navigator>
          </view>
        </view>
      </view>
      <view class="com-item1">
        <view class="com-wrap">
          <view v-for="(item, index) in adminOptions" :key="index" class="cell">
            <navigator :url="item.url" hover-class="none">
              <view class="cell-left">
                <image
                  class="cell-icon" :src="item.icon"
                  style="width: 70rpx;border-radius: 50%;"
                  mode="widthFix"
                />
                <view class="cell-text">
                  {{ item.title }}
                </view>
                <image class="arrow" src="/static/images/arrow_right.png" />
              </view>
              <view class="iconfont" />
            </navigator>
          </view>
        </view>
      </view>
      <view class="another">
        <text>高级管理功能</text>
      </view>
      <view class="com-item1">
        <view class="com-wrap">
          <view v-for="(item, index) in superAdminOptions" :key="index" class="cell">
            <navigator :url="item.url" hover-class="none">
              <view class="cell-left">
                <image
                  class="cell-icon" :src="item.icon"
                  style="width: 70rpx;border-radius: 50%;"
                  mode="widthFix"
                />
                <view class="cell-text">
                  {{ item.title }}
                </view>
                <image class="arrow" src="/static/images/arrow_right.png" />
              </view>
              <view class="iconfont" />
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const userOptions = [
  {
    title: "我的发布",
    icon: "/static/images/my_publish.png",
	  url:"/pages/moment/moment",
  },
  {
    title: "快速联系",
    icon: "/static/images/quick_contact.png",
	  url:"/pages/profile/quick_contact",
  },
  {
    title: "申请领养",
    icon: "/static/images/apply_adopt.png",
	  url:"/pages/profile/apply_adopt",
  }
]
const adminOptions = [
  {
    title: "申请管理",
    icon: "/static/images/apply_admin.png",
	  url:"/pages/profile/apply_admin",
  },
  {
    title: "关于我们",
    icon: "/static/images/about_us.png",
	  url:"/pages/profile/about_us",
  }
]
const superAdminOptions = [
  {
    title: "发布公告",
    icon: "/static/images/notice.png",
	  url:"/pages/profile/quick_contact",
  },
  {
    title: "管理审核",
    icon: "/static/images/admin_check.png",
	  url:"/pages/profile/quick_contact",
  },
  {
    title: "成员管理",
    icon: "/static/images/member_admin.png",
	  url:"/pages/profile/quick_contact",
  },
  {
    title: "轮播设置",
    icon: "/static/images/carousel_setting.png",
	  url:"/pages/profile/quick_contact",
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
.fot-xh .pic {
  float: left;
  margin-right: 50rpx;
  margin-left: 50rpx;
  margin-top: 60rpx;
}
.fot-xh .txt {
  padding: 15rpx 0;
  overflow: hidden;
}
.fot-xh .txt .info {
  margin-top: 55rpx;
  position: absolute;
  display: block;
}
.fot-xh .txt .info .nickname {
  font-size: 35rpx;
  margin-bottom: 13rpx;
  font-weight: bold;
}
.fot-xh .txt .info .right {
  font-size: 20rpx;
  margin-bottom: 5rpx;
}
.fot-xh .txt .info .unit {
  font-size: 20rpx;
  margin-bottom: 5rpx;
}
.com-item {
  padding-left: 20rpx;
  padding-right: 20rpx;
  margin-top: 200rpx;
  margin-bottom: 20rpx;
}
.com-item .com-wrap {
  border-radius: 25rpx;
  overflow: hidden;
}
.com-item1 {
  padding-left: 20rpx;
  padding-right: 20rpx;
  margin-bottom: 50rpx;
}
.com-item1 .com-wrap {
  border-radius: 25rpx;
  overflow: hidden;
}
.cell {
  height: 80rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  margin-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f8f8f8;
  .cell-left {
    display: flex;
    align-items: center;
    .cell-icon {
      width: 50rpx;
      height: 50rpx;
	  float:left;
    }
    .cell-text {
	  width: 400rpx;
      color: #666;
      font-size: 28rpx;
      margin-left: 20rpx;
    }
	.arrow {
	  width: 30rpx;
	  height: 30rpx;
	  right: 30rpx;
	  margin-left:450rpx;
	}
  }
  .iconfont {
    font-size: 40rpx;
    color: #999;
  }
}
.another {
  padding-left: 45rpx;
  font-size: 30rpx;
  margin-bottom: 13rpx;
  font-weight: bold;
}
</style>