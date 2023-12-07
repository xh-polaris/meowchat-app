export function onClickImage(current: string, images: string[]) {
  if (!current || !images.length) {
    return;
  }
  uni.previewImage({
    urls: images,
    current: current
  });
}
