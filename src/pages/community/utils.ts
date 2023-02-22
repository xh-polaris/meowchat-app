import { News } from "@/apis/schemas";
import { Pages } from "@/utils/url";

export function onClickCarousel(c: News) {
  if (c.type === "inner") {
    uni.navigateTo({
      url: c.linkUrl
    });
  } else if (c.type === "article") {
    uni.navigateTo({
      url: `${Pages.WebView}?url=${c.linkUrl}`
    });
  }
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
