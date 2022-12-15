import { CatPreview } from "@/apis/community/community-interfaces";

export function onClickCatBox(id: string) {
    uni.navigateTo({
        url: `/pages/detail/detail?id=${id}`
    });
}

export function onClickSearch() {
    uni.navigateTo({
        url: `/pages/search/search`
    });
}

export function onClickCancel() {
    uni.navigateTo({
        url: `/pages/collection/collection`
    });
}

export function onClickCollect(cat: CatPreview) {
    cat.isCollected = !cat.isCollected;
}

