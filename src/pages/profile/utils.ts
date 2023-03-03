import { Pages } from "@/utils/url";

export function CopyToClipboard(res: string) {
  uni.setClipboardData({
    data: res,
    success: () => {
      uni.showToast({
        title: "复制成功"
      });
    }
  });
}
export function showPage() {
  uni.showToast({
    title: "页面开发中",
    icon: "error",
    duration: 2000
  });
  setTimeout(function () {
    uni.reLaunch({
      url: Pages.Profile
    });
  }, 1500);
}
