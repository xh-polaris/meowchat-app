import {
  DeleteCatReq,
  DeleteCatResp,
  GetCatDetailReq,
  GetCatDetailResp,
  GetCatPreviewsReq,
  GetCatPreviewsResp,
  GetImageByCatReq,
  GetImageByCatResp,
  NewCatReq,
  NewCatResp,
  SearchCatPreviewsReq,
  SearchCatPreviewsResp,
  CreateImageResp,
  CreateImageReq,
  DeleteImageReq,
  DeleteImageResp
} from "./collection-interfaces";
import { PictureStyle } from "@/apis/cos/cos-interface";

export async function deleteCat(req: DeleteCatReq) {
  return await new Promise<DeleteCatResp>((resolve, reject) => {
    uni.request({
      url: "/collection/delete_cat",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as DeleteCatResp;
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function newCat(req: NewCatReq) {
  return await new Promise<NewCatResp>((resolve, reject) => {
    uni.request({
      url: "/collection/new_cat",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as NewCatResp;
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function getCatPreviews(req: GetCatPreviewsReq) {
  return await new Promise<GetCatPreviewsResp>((resolve, reject) => {
    uni.request({
      url: "/collection/get_cat_previews",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetCatPreviewsResp;
        data.cats.forEach((cat) => {
          cat.avatarUrl += PictureStyle.thumbnail;
        });
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function searchCatPreviews(req: SearchCatPreviewsReq) {
  return await new Promise<SearchCatPreviewsResp>((resolve, reject) => {
    uni.request({
      url: "/collection/search_cat",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as SearchCatPreviewsResp;
        data.cats.forEach((cat) => {
          cat.avatarUrl += PictureStyle.thumbnail;
        });
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function getCatDetail(req: GetCatDetailReq) {
  return await new Promise<GetCatDetailResp>((resolve, reject) => {
    uni.request({
      url: "/collection/get_cat_detail",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetCatDetailResp;
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function getCatImage(req: GetImageByCatReq) {
  return await new Promise<GetImageByCatResp>((resolve, reject) => {
    uni.request({
      url: "/collection/get_image_by_cat",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetImageByCatResp;
        resolve(data);
      }
    });
  });
}

/**
 * @description
 * @param req
 */
export async function CreateImage(
  req: CreateImageReq
): Promise<CreateImageResp> {
  return await new Promise<CreateImageResp>((resolve, reject) => {
    uni.request({
      url: "/collection/create_image",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as CreateImageResp;
        resolve(data);
      }
    });
  });
}
export async function deletePost(req: DeleteImageReq) {
  return await new Promise<DeleteImageResp>((resolve, reject) => {
    uni.request({
      url: "/collection/delete_image",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as DeleteImageResp;
        resolve(data);
      }
    });
  });
}
