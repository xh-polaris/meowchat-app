export function onClickImage(current: string, images: string[]) {
  uni.previewImage({
    urls: images,
    current: current
  });
}
