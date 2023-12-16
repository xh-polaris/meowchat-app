import { Pages } from "@/utils/url";

const shareSuccess = () => {
  uni.showToast({
    title: "分享成功"
  });
};

const shareFail = () => {
  uni.showToast({
    title: "分享失败",
    icon: "none"
  });
};

const share = {
  title: "给你分享了一只可爱的猫咪",
  path: Pages.FirstPage, // 默认分享路径
  imageUrl: "https://static.xhpolaris.com/static/meowchat/cover.png" // 默认分享图片
};

export default {
  onShareAppMessage() {
    return {
      ...share,
      success() {
        shareSuccess();
      },
      fail() {
        shareFail();
      }
    };
  },
  // 分享到朋友圈
  onShareTimeline() {
    return {
      ...share,
      success() {
        shareSuccess();
      },
      fail() {
        shareFail();
      }
    };
  }
};
