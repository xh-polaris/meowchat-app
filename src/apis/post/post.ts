import {
  DeletePostReq,
  DeletePostResp,
  GetPostDetailReq,
  GetPostDetailResp,
  GetPostPreviewsReq,
  GetPostPreviewsResp,
  NewPostReq,
  NewPostResp
} from "@/apis/post/post-interfaces";
import { PictureStyle } from "@/apis/cos/cos-interface";

export async function getPostPreviews(req: GetPostPreviewsReq) {
  return await new Promise<GetPostPreviewsResp>((resolve, reject) => {
    uni.request({
      url: "/post/get_post_previews",
      method: "POST",
      data: req,
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetPostPreviewsResp;
        data.posts?.forEach((post) => {
          if (post.coverUrl) {
            post.coverUrl += PictureStyle.thumbnail;
          }
          if (post.user?.avatarUrl) {
            post.user.avatarUrl += PictureStyle.thumbnail;
          }
        });
        resolve(data);
      }
    });
  });
}

export async function deletePost(req: DeletePostReq) {
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
      }
    });
  });
}

export async function newPost(req: NewPostReq) {
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
      }
    });
  });
}

export async function getPostDetail(req: GetPostDetailReq) {
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
        if (data.post.user?.avatarUrl) {
          data.post.user.avatarUrl += PictureStyle.thumbnail;
        }
        resolve(data);
      }
    });
  });
}
