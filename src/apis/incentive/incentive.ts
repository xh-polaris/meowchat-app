import {
  UserCheckInResp,
  getMissionResp
} from "@/apis/incentive/incentive-interfaces";

export async function userCheckIn() {
  return await new Promise<UserCheckInResp>((resolve, reject) => {
    uni.request({
      url: "/incentive/check_in",
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as UserCheckInResp;
        resolve(data);
      }
    });
  });
}

export async function getUserMission() {
  return await new Promise<getMissionResp>((resolve, reject) => {
    uni.request({
      url: "/incentive/get_mission",
      method: "GET",
      success(res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode !== 200) {
          reject(res);
        }
        const data = res.data as getMissionResp;
        resolve(data);
      }
    });
  });
}
