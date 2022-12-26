import { Cat, CatPreview } from "../schemas"

export interface GetCatPreviewsReq {
  page: number;
  communityId: string;
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
