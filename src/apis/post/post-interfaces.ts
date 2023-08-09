import { PaginationOptions, Post, Tag } from "../schemas";

interface AllFieldsKey {
  key: string;
}

interface MultiFieldsKey {
  title?: string;
  text?: string;
  tag?: string;
}

export interface GetPostPreviewsReq {
  page?: number;
  paginationOption?: PaginationOptions;
  onlyOfficial?: boolean;
  onlyUserId?: string;
  searchOptions?: AllFieldsKey | MultiFieldsKey;
}

export interface GetPostPreviewsResp {
  posts: Post[];
  code: number;
  msg: string;
  token: string;
  total: number;
}

export interface GetPostDetailReq {
  postId: string;
}

export interface GetPostDetailResp {
  post: Post;
  code: number;
  msg: string;
}

export interface NewPostReq {
  id?: string;
  isOfficial: boolean;
  title: string;
  text: string;
  coverUrl?: string;
  tags: Tag[];
}

export interface NewPostResp {
  code: number;
  msg: string;
  postId: string;
}

export interface DeletePostReq {
  id: string;
}

export interface DeletePostResp {
  code: number;
  msg: string;
}
