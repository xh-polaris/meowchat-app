import { CatPreview } from "@/apis/schemas";

export function onClickCatBox(id: string) {
  uni.navigateTo({
    url: `/pages/cat/cat?id=${id}`
  });
}

export function onClickSearch() {
  uni.navigateTo({
    url: "/pages/search/search"
  });
}

export function onClickCancel() {
  uni.navigateTo({
    url: "/pages/collection/collection"
  });
}

export function onClickCollect(cat: CatPreview) {
  cat.isCollected = !cat.isCollected;
}

export function onClickSwitch() {
  uni.navigateTo({
    url: "/pages/community/school_select"
  });
}
