import { Pages } from "@/utils/url";

export function onClickMessage() {
  uni.navigateTo({
    url: Pages.Message
  });
}
