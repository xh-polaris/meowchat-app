import { Comment } from "@/apis/schemas";

export interface GetCommentsReq {
  // 作用域，如动态、帖子、评论
  type: CommentType;
  page: number;
  id: string;
}

export interface GetCommentsResp {
  code: number;
  msg: string;
  comments: Comment[];
  total: number;
}

export interface NewCommentReq {
  text: string;
  id: string;
  firstLevelId?: string;
  type: CommentType;
}

export interface NewCommentResp {
  code: number;
  msg: string;
}

export interface DeleteCommentReq {
  commentId: string;
}

export interface DeleteCommentResp {
  code: number;
  msg: string;
}

export enum CommentType {
  Comment = 1,
  Post = 2,
  Moment = 3
}
