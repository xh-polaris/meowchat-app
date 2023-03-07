export function onClickImage(index: number, images: string[]) {
  uni.previewImage({
    urls: images,
    current: index
  });
}
