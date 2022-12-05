export function onClickPost(id: string) {
    uni.navigateTo({
        url: `/pages/world/post-detail/post-detail?id=${id}`
    });
}