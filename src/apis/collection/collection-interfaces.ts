import { Cat, CatPreview } from "../schemas";

export interface GetCatPreviewsReq {
  page: number;
  communityId: string;
}

export interface SearchCatPreviewsReq {
  communityId: string;
  page: number;
  keyword: string;
}

export interface SearchCatPreviewsResp {
  cats: CatPreview[];
  code: number;
  msg: string;
}

export interface GetCatPreviewsResp {
  cats: CatPreview[];
  code: number;
  msg: string;
}

export interface GetCatDetailReq {
  catId: string;
}

export interface GetCatDetailResp {
  cat: Cat;
  code: number;
  msg: string;
}

export interface NewCatReq {
  id?: string;
  age: string;
  communityId: string;
  color: string;
  details: string;
  name: string;
  popularity: number;
  sex: string;
  area: string;
  isSnipped: boolean;
  isSterilized: boolean;
  avatars: string[];
}

export interface NewCatResp {
  code: number;
  msg: string;
  catId: string;
}

export interface DeleteCatReq {
  catId: string;
}

export interface DeleteCatResp {
  code: number;
  msg: string;
}

export interface GetImageByCatReq {
  catId: string;
  prevId?: string;
  limit: number;
}

export interface GetImageByCatResp {
  code: number;
  images: Image[];
  lastId: string;
  msg: string;
}

export interface CreateImageReq {
  images: CatImage[];
}

export interface CatImage {
  catId: string;
  url: string;
}

export interface Image {
  id: string;
  url: string;
  catId: string;
}

export interface ImageInfo {
  id: string;
  url: string;
  catId: string;
  isLiked: boolean;
  likeNumber: number;
}

export interface CreateImageResp {
  code: number;
  msg: string;
  images: Image[];
}

export interface DeleteImageReq {
  id: string;
}

export interface DeleteImageResp {
  code: number;
  msg: string;
}
