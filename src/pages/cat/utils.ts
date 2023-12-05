export function onClickImage(index: number, images: string[]) {
  uni.previewImage({
    urls: images,
    current: index
  });
}

export function onClickAvatar(current: string, images?: string[]) {
  uni.previewImage({
    urls: images || [current],
    current: current
  });
}
