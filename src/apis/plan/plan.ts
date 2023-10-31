import {
  DeletePlanReq,
  DonateFishReq,
  GetPlanDetailReq,
  GetPlanDetailResp,
  GetPlanPreviewsReq,
  GetPlanPreviewsResp,
  GetUserFishReq,
  GetUserFishResp,
  ListFishByPlanReq,
  ListFishByPlanResp,
  NewPlanReq
} from "./plan-interfaces";

export async function deletePlan(req: DeletePlanReq) {
  return await new Promise<object>((resolve, reject) => {
    uni.request({
      url: "/plan/delete_plan",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as object;
        resolve(data);
      }
    });
  });
}

export async function newPlan(req: NewPlanReq) {
  return await new Promise<object>((resolve, reject) => {
    uni.request({
      url: "/plan/new_plan",
      data: req,
      method: "POST",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as object;
        resolve(data);
      }
    });
  });
}

export async function getPlanPreviews(req: GetPlanPreviewsReq) {
  return await new Promise<GetPlanPreviewsResp>((resolve, reject) => {
    uni.request({
      url: "/plan/get_plan_previews",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetPlanPreviewsResp;
        resolve(data);
      }
    });
  });
}

export async function getPlanDetail(req: GetPlanDetailReq) {
  return await new Promise<GetPlanDetailResp>((resolve, reject) => {
    uni.request({
      url: "/plan/get_plan_detail",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetPlanDetailResp;
        resolve(data);
      }
    });
  });
}

export async function listFishByPlan(req: ListFishByPlanReq) {
  return await new Promise<ListFishByPlanResp>((resolve, reject) => {
    uni.request({
      url: "/plan/list_fish_by_plan",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as ListFishByPlanResp;
        resolve(data);
      }
    });
  });
}

export async function getUserFish(req: GetUserFishReq) {
  return await new Promise<GetUserFishResp>((resolve, reject) => {
    uni.request({
      url: "/plan/get_user_fish",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as GetUserFishResp;
        resolve(data);
      }
    });
  });
}

export async function donateFish(req: DonateFishReq) {
  return await new Promise<object>((resolve, reject) => {
    uni.request({
      url: "/plan/donate_fish",
      data: req,
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as object;
        resolve(data);
      }
    });
  });
}
