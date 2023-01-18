export function onClickCarousel(url: string) {
  uni.navigateTo({
    url
  });
}

export function onClickMoment(id: string) {
  uni.navigateTo({
    url: `/pages/moment/moment?id=${id}`
  });
}

export function onClickSwitch() {
  uni.navigateTo({
    url: "/pages/community/school-select"
  });
}
