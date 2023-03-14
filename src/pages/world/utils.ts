import { PictureStyle } from "@/apis/cos/cos-interface";

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

export function onClickCover(coverUrl: string) {
  uni.previewImage({
    urls: [coverUrl.substring(0, coverUrl.indexOf(PictureStyle.thumbnail))]
  });
}
