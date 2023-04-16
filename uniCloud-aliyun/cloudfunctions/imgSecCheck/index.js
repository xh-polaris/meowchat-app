"use strict";
var appid = "wxd39cebf05e21d3b6";
var appsecret = "8f7b0cc63b7741ab6570ae562f3ff660";
// 获取 access_token 值
let tokenUrl =
  "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" +
  appid +
  "&secret=" +
  appsecret;
// 文本内容检测接口
let checkUrl = "https://api.weixin.qq.com/wxa/img_sec_check?access_token=";

// 云函数入口函数
exports.main = async (event, context) => {
  let tokenResponse = await uniCloud.httpclient.request(tokenUrl, {
    method: "POST",
    data: {
      appid: appid,
      appsecret: appsecret
    },
    dataType: "json"
  });

  let token = tokenResponse.data.access_token;
  let checkResponse = await uniCloud.httpclient.request(checkUrl + token, {
    method: "POST",
    dataType: "json",
    files: [Buffer.from(event.image, "base64")]
    // data: {
    // 	media: [Buffer.from(event.image, 'base64')]
    // }
  });
  return checkResponse;
};
