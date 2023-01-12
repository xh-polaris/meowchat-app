import {
  DeletePostReq,
  DeletePostResp,
  GetPostDetailReq,
  GetPostDetailResp,
  GetPostPreviewsReq,
  GetPostPreviewsResp,
  NewPostReq,
  NewPostResp,
} from "@/apis/post/post-interfaces";

export function getPostPreviews(
  req: GetPostPreviewsReq
): Promise<GetPostPreviewsResp> {
  return new Promise<GetPostPreviewsResp>((resolve, reject) => {
    uni.request({
      url: "/post/get_post_previews",
      method: "GET",
      data: req,
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetPostPreviewsResp;
        resolve(data);
      },
    });
  });
}

/**
 * @description
 * @param req
 */
export async function deletePost(req: DeletePostReq): Promise<DeletePostResp> {
  return await new Promise<DeletePostResp>((resolve, reject) => {
    uni.request({
      url: "/post/delete_post",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as DeletePostResp;
        resolve(data);
      },
    });
  });
}

/**
 * @description
 * @param req
 */
export async function newPost(req: NewPostReq): Promise<NewPostResp> {
  return await new Promise<NewPostResp>((resolve, reject) => {
    uni.request({
      url: "/post/new_post",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as NewPostResp;
        resolve(data);
      },
    });
  });
}

/**
 * @description
 * @param req
 */
export async function getPostDetail(
  req: GetPostDetailReq
): Promise<GetPostDetailResp> {
  return await new Promise<GetPostDetailResp>((resolve, reject) => {
    uni.request({
      url: "/post/get_post_detail",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetPostDetailResp;
        resolve(data);
      },
    });
  });
}
