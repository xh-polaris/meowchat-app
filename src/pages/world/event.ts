export function onClickPost(id: string) {
  uni.navigateTo({
    url: `/pages/post/post?id=${id}`,
  });
}
