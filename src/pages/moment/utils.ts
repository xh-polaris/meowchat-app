import { doLike } from "@/apis/like/like";
import {
  GetCommentsReq,
  NewCommentReq,
  NewCommentResp
} from "@/apis/comment/comment-interfaces";
import { getComments, newComment } from "@/apis/comment/comment";
import { Comment, FishAward, Moment, TargetType } from "@/apis/schemas";
import { EventEmitter } from "@/utils/utils";

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

export const likeMoment = async (
  item: Moment,
  eventEmitter?: EventEmitter<FishAward>
) => {
  doLike({ targetId: item.id, targetType: TargetType.Moment }).then((res) => {
    if (item.isLiked) {
      item.likeCount--;
    } else {
      item.likeCount++;
      if (eventEmitter) eventEmitter.triggerCallbacks(res);
    }
    item.isLiked = !item.isLiked;
  });
};

export const likeComment = async (
  item: Comment,
  eventEmitter?: EventEmitter<FishAward>
) => {
  doLike({ targetId: item.id, targetType: TargetType.Comment }).then((res) => {
    if (item.isLiked) {
      item.likeCount--;
    } else {
      item.likeCount++;
      if (eventEmitter) {
        eventEmitter.triggerCallbacks(res);
      }
    }
    item.isLiked = !item.isLiked;
  });
};

export const getCommentsData = async (req: GetCommentsReq) => {
  const commentsTemp = (await getComments(req)).comments;
  return { data: commentsTemp };
};

export const createComment = async (
  req: NewCommentReq,
  callback?: (res: NewCommentResp) => void
) => {
  if (req.text === "") {
    return false;
  }
  let res: NewCommentResp;
  try {
    res = await newComment(req);
  } catch (reason: any) {
    const code = reason.data.Code;
    if (code === 10001) {
      uni.showToast({
        title: "文本含敏感内容",
        icon: "none"
      });
    } else {
      uni.showToast({
        title: "评论失败",
        icon: "none"
      });
    }
    return false;
  }
  if (!res.getFish) {
    uni.showToast({
      title: "评论成功"
    });
  } else if (callback) {
    callback(res);
  }
  return true;
};

export function onClickImage(index: string, photo: Array<string>) {
  uni.previewImage({
    current: index,
    urls: photo
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
    return "aspectFill";
  } else {
    return "aspectFill";
  }
}
