import {
  GetCommentsReq,
  GetCommentsResp,
  NewCommentReq,
  NewCommentResp,
} from "@/apis/comment/comment-interfaces";

export async function newComment(req: NewCommentReq): Promise<NewCommentResp> {
  return await new Promise<NewCommentResp>((resolve, reject) => {
    uni.request({
      url: "/comment/new_comment",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as NewCommentResp;
        resolve(data);
      },
    });
  });
}

/**
 * @description
 * @param req
 */
export async function getComments(
  req: GetCommentsReq
): Promise<GetCommentsResp> {
  return await new Promise<GetCommentsResp>((resolve, reject) => {
    uni.request({
      url: "/comment/get_comments",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetCommentsResp;
        resolve(data);
      },
    });
  });
}
