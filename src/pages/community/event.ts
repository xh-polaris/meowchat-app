export function onClickCarousel (url: string) {
  uni.navigateTo({
    url
  })
}

export function onClickMoment (id: string) {
  uni.navigateTo({
    url: `/pages/moment/moment?id=${id}`
  })
}
