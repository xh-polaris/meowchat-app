export function CopyToClipboard(res: string) {
  uni.setClipboardData({
    data: res,
    success: () => {
      uni.showToast({
        title: "ε€εΆζε",
      });
    },
  });
}
