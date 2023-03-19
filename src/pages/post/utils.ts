export function onClickImage(photo: string) {
  const imgsArray = [];
  imgsArray[0] = photo;
  uni.previewImage({
    current: 0,
    urls: imgsArray
  });
}
