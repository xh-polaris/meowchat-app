import { DoLikeReq, GetCountReq } from "@/apis/like/like-interface";
import { doLike, getCount, getUserLiked } from "@/apis/like/like";
import {
  GetCommentsReq,
  NewCommentReq
} from "@/apis/comment/comment-interfaces";
import { getComments, newComment } from "@/apis/comment/comment";
import { TargetType } from "@/apis/schemas";

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

export const getCommentsData = async (req: GetCommentsReq) => {
  const commentsTemp = (await getComments(req)).comments;
  const likeDataTemp = [];
  if (commentsTemp.length > 0) {
    for (let i = 0; i < commentsTemp.length; i++) {
      likeDataTemp.push(
        await getLikeData({
          targetId: commentsTemp[i].id,
          targetType: TargetType.Comment
        })
      );
    }
  }
  return { data: commentsTemp, likeData: likeDataTemp };
};

export const createComment = async (req: NewCommentReq) => {
  if (req.text !== "") {
    newComment(req)
      .then((res) => {
        uni.showToast({
          title: res.msg
        });
        return true;
      })
      .catch((reason) => {
        const code = reason.data.Code;
        if (code === 10001) {
          uni.showToast({
            title: "文本含不合法内容",
            icon: "none"
          });
        } else {
          uni.showToast({
            title: "评论失败",
            icon: "none"
          });
        }
        return false;
      });
  }
  return false;
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
