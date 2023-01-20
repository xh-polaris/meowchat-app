export function onClickPost(id: string) {
  uni.navigateTo({
    url: `/pages/post/post?id=${id}`
  });
}
export function search() {
  uni.navigateTo({
    url: "/pages/search/search"
  });
}
