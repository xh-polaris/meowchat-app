import { DoLikeReq, GetCountReq } from "@/apis/like/like-interface";
import { doLike, getCount, getUserLiked } from "@/apis/like/like";
import { NewCommentReq } from "@/apis/comment/comment-interfaces";
import { newComment } from "@/apis/comment/comment";

export const enterReply = uni.createAnimation({
  transformOrigin: "50% 50%",
  duration: 300,
  timingFunction: "ease",
  delay: 0
});

export const enterMask = uni.createAnimation({
  transformOrigin: "50% 50%",
  duration: 5,
  timingFunction: "ease",
  delay: 0
});

export interface LikeStruct {
  count: number;
  isLike: boolean;
}

export const getLikeData = async (likeReq: GetCountReq) => {
  const count = (await getCount(likeReq)).count;
  const isLike = (await getUserLiked(likeReq)).liked;
  return {
    count: count,
    isLike: isLike
  };
};

export const localDoLike = async (req: DoLikeReq) => {
  await doLike(req);
  return await getLikeData(req);
};

export const createComment = async (req: NewCommentReq) => {
  if (req.text !== "") {
    const res = await newComment(req);
    uni.showToast({
      title: res.msg
    });
    return true;
  }
  return false;
};

export function onClickImage(url: string) {
  uni.previewImage({
    urls: [url]
  });
}

export function chooseImageClass(length: number) {
  if (length === 1) {
    return "imgs imgs1 clearfix";
  } else if (length === 2 || length === 4) {
    return "imgs imgs2 clearfix";
  } else {
    return "imgs imgs5 clearfix";
  }
}

export function chooseImageMode(length: number) {
  if (length === 1) {
    return "widthFix";
  } else if (length === 2 || length === 4) {
    return "scaleToFill";
  } else {
    return "aspectFill";
  }
}
