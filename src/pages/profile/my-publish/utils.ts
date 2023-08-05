export function onClickPost(id: string) {
  uni.navigateTo({
    url: `/pages/post/post?id=${id}`
  });
}

export function onClickMoment(id: string) {
  uni.navigateTo({
    url: `/pages/moment/moment?id=${id}`
  });
}
