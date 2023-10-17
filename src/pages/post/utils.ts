import { Post, TargetType } from "@/apis/schemas";
import { doLike } from "@/apis/like/like";

export function onClickImage(photo: string) {
  const imgsArray = [];
  imgsArray[0] = photo;
  uni.previewImage({
    current: 0,
    urls: imgsArray
  });
}

export const likePost = async (item: Post) => {
  doLike({ targetId: item.id, targetType: TargetType.Comment }).then(() => {
    if (item.isLiked) {
      item.likes--;
    } else {
      item.likes++;
    }
    item.isLiked = !item.isLiked;
  });
};
