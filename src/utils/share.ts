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

export default {
  data() {
    return {
      // 默认的分享参数
      share: {
        title: "给你分享了一只可爱的猫咪",
        path: "/pages/community/community", // 默认分享路径
        imageUrl: "https://static.xhpolaris.com/static/meowchat/cover.png", // 默认分享图片
        desc: "",
        content: ""
      }
    };
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  onShareAppMessage(res: any) {
    console.log("全局分享", res);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const shareInfo = res.target ? res.target.dataset.shareinfo : this.share;
    return {
      ...shareInfo,
      success() {
        shareSuccess();
      },
      fail() {
        shareFail();
      }
    };
  },
  // 分享到朋友圈
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  onShareTimeline(res: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const shareInfo = res.target ? res.target.dataset.shareinfo : this.share;
    return {
      ...shareInfo,
      success() {
        shareSuccess();
      },
      fail() {
        shareFail();
      }
    };
  }
};
