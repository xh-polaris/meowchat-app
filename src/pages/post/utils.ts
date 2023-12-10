import { FishAward, Post, TargetType } from "@/apis/schemas";
import { doLike } from "@/apis/like/like";
import { EventEmitter } from "@/utils/utils";

export function onClickImage(photo: string) {
  const imgsArray = [];
  imgsArray[0] = photo;
  uni.previewImage({
    current: 0,
    urls: imgsArray
  });
}

export const likePost = (
  item: Post,
  eventEmitter?: EventEmitter<FishAward>
) => {
  doLike({ targetId: item.id, targetType: TargetType.Post }).then((res) => {
    if (item.isLiked) {
      item.likes--;
    } else {
      item.likes++;
      if (eventEmitter) {
        eventEmitter.triggerCallbacks(res);
      }
    }
    item.isLiked = !item.isLiked;
  });
};
