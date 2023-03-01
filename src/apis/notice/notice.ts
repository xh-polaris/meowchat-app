import {
  GetAdminsReq,
  GetAdminsResp,
  GetNewsReq,
  GetNewsResp,
  GetNoticeReq,
  GetNoticesResp,
  NewNewReq,
  NewNewResp,
  NewNoticeReq,
  NewNoticeResp
} from "./notice-interfaces";

export async function getNews(req: GetNewsReq) {
  return await new Promise<GetNewsResp>((resolve, reject) => {
    uni.request({
      url: "/notice/get_news",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetNewsResp;
        resolve(data);
      }
    });
  });
}

export async function getAdmins(req: GetAdminsReq) {
  return await new Promise<GetAdminsResp>((resolve, reject) => {
    uni.request({
      url: "/notice/get_admins",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetAdminsResp;
        resolve(data);
      }
    });
  });
}

export async function getNotices(req: GetNoticeReq) {
  return await new Promise<GetNoticesResp>((resolve, reject) => {
    uni.request({
      url: "/notice/get_notices",
      method: "GET",
      data: req,
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetNoticesResp;
        resolve(data);
      }
    });
  });
}

export async function newNotice(req: NewNoticeReq) {
  return await new Promise<NewNoticeResp>((resolve, reject) => {
    uni.request({
      url: "/notice/new_notice",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as NewNoticeResp;
        resolve(data);
      }
    });
  });
}

export async function newNew(req: NewNewReq) {
  return await new Promise<NewNewResp>((resolve, reject) => {
    uni.request({
      url: "/notice/new_new",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as NewNewResp;
        resolve(data);
      }
    });
  });
}
