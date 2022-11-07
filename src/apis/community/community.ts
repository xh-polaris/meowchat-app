import * as components from "./community-components"

export * from "./community-components"

/**
 * @description
 * @param req
 */
export async function getCarousel (): Promise<components.GetCarouselResp> {
  return new Promise<components.GetCarouselResp>(function (resolve, reject) {
    uni.request({
      url: "/get_carousel",
      method: "GET",
      success (res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode != 200) {
          reject(res)
        }
        const data = res.data as components.GetCarouselResp
        resolve(data)
      },
    })
  })
}

export async function getCats (): Promise<components.GetCatsResp> {
  return new Promise<components.GetCatsResp>(function (resolve, reject) {
    uni.request({
      url: "/collection/get_cats",
      method: "GET",
      success (res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode != 200) {
          reject(res)
        }
        const data = res.data as components.GetCatsResp
        resolve(data)
      },
    })
  })
}
