export interface Carousel {
  imageUrl: string
  linkUrl: string
  linkType: string
}

export interface GetCarouselResp {
  code: number
  msg: string
  carousels: Carousel[]
}

export interface Cat {
  id: string
  createAt: string
  age: string
  campusId: string
  color: string
  details: string
  name: string
  popularity: number
  sex: string
  status: number
  area: string
  isSnipped: boolean
  isSterilized: boolean
  avatars: string[]
}

export interface CollectionCat {
  id: string
  createAt: string
  age: string
  campusId: string
  color: string
  details: string
  name: string
  popularity: number
  sex: string
  status: number
  area: string
  isSnipped: boolean
  isSterilized: boolean
  avatars: string[]
  isCollected: boolean
}

export interface GetCatsResp {
  code: number
  msg: string
  cats: Array<CollectionCat>
}
