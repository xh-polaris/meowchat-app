export function onClickImage(current: string, images: string[]) {
  if (!current || !images) {
    return;
  }
  uni.previewImage({
    urls: images,
    current: current
  });
}
