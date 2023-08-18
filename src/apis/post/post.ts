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
    req.page = 2;
    if (!req.paginationOption) {
      req.paginationOption = { limit: 10 };
    } else if (!req.paginationOption.limit) {
      req.paginationOption.limit = 10;
    }
    uni.request({
      url: "/post/get_post_previews",
      method: "POST",
      data: req,
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetPostPreviewsResp;
        const newData: GetPostPreviewsResp = {
          ...data,
          posts: []
        };
        data.posts.forEach((post) => {
          if (!post.user) return;
          if (post.coverUrl) {
            post.coverUrl += PictureStyle.thumbnail;
          }
          post.user.avatarUrl += PictureStyle.thumbnail;
          newData.posts.push(post);
        });
        resolve(newData);
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
        data.post.user.avatarUrl += PictureStyle.thumbnail;
        resolve(data);
      }
    });
  });
}
