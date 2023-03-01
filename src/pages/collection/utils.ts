import { CatPreview } from "@/apis/schemas";
import { Pages } from "@/utils/url";

export function onClickCatBox(id: string,name:string) {
  uni.navigateTo({
    url: `${Pages.Cat}?id=${id}&name=${name}`
  });
}

export function onClickSearch() {
  uni.navigateTo({
    url: Pages.Search
  });
}

export function onClickCancel() {
  uni.navigateTo({
    url: Pages.Collection
  });
}

export function onClickCollect(cat: CatPreview) {
  cat.isCollected = !cat.isCollected;
}

export function onClickSwitch() {
  uni.navigateTo({
    url: Pages.SchoolSelect
  });
}
