import { Pages } from "@/utils/url";
import { StorageKeys } from "@/utils/const";

export function CopyToClipboard(res: string) {
  uni.setClipboardData({
    data: res,
    success: () => {
      uni.showToast({
        title: "复制到剪贴板"
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

export function toPersonInfo(id: string) {
  if (id === uni.getStorageSync(StorageKeys.UserId))
    uni.switchTab({
      url: `${Pages.Profile}`
    });
  else
    uni.navigateTo({
      url: `${Pages.Person}?userId=${id}`
    });
}
