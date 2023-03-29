export function onClickMoment(id: string) {
  uni.navigateTo({
    url: `/pages/moment/moment?id=${id}`
  });
}
