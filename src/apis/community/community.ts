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

export async function getCatPreviews (): Promise<components.GetCatPreviewsResp> {
  return new Promise<components.GetCatPreviewsResp>(function (resolve, reject) {
    uni.request({
      url: "/collection/get_cat_previews",
      method: "GET",
      success (res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode != 200) {
          reject(res)
        }
        const data = res.data as components.GetCatPreviewsResp
        resolve(data)
      },
    })
  })
}

export async function getMomentPreviews (): Promise<components.GetMomentPreviewsResp> {
  return new Promise<components.GetMomentPreviewsResp>(function (resolve, reject) {
    uni.request({
      url: "/moment/get_moment_previews",
      method: "GET",
      success (res: UniNamespace.RequestSuccessCallbackResult) {
        if (res.statusCode != 200) {
          reject(res)
        }
        const data = res.data as components.GetMomentPreviewsResp
        resolve(data)
      },
    })
  })
}
