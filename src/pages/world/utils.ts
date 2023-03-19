import { PictureStyle } from "@/apis/cos/cos-interface";
import { Pages } from "@/utils/url";

export function onClickPost(id: string) {
  uni.navigateTo({
    url: `${Pages.Post}?id=${id}`
  });
}
export function search() {
  uni.navigateTo({
    url: Pages.Search
  });
}

export function onClickCover(coverUrl: string) {
  const index = coverUrl.indexOf(PictureStyle.thumbnail);
  uni.previewImage({
    urls: [index == -1 ? coverUrl : coverUrl.substring(0, index)]
  });
}
