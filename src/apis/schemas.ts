export interface Status {
  code: number;
  msg: string;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  offset?: number;
  lastToken?: string;
  backward?: boolean;
}

// user

export interface User {
  id: string;
  nickname: string;
  avatarUrl: string;
  motto: string;
  article: number;
  follower: number;
  following: number;
  enableDebug?: boolean;
}

export interface Auth {
  authType: string;
  authId: string;
}

// comment

export interface Comment {
  id: string;
  likeCount: number;
  createAt: number;
  text: string;
  user: User;
  comments?: number;
  replyUser?: User;
  isLiked?: boolean;
}

// post

export interface Post {
  id: string;
  createAt: number;
  isAnonymous: boolean;
  title: string;
  text: string;
  coverUrl?: string;
  tags: Tag[];
  likes: number;
  comments: number;
  user?: User;
  status: number;
  isOfficial: boolean;
  isLiked?: boolean;
}

export interface Tag {
  id: string;
  name: string;
}

// school

export interface Community {
  id: string;
  name: string;
  parentId?: string;
}

// notice

export interface Notice {
  id: string;
  text: string;
  createAt: number;
  user: User;
}

export interface News {
  id: string;
  imageUrl: string;
  linkUrl: string;
  type: string;
  user: User;
}

export interface Admin {
  name: string;
  avatarUrl: string;
  wechat: string;
  phone: string;
}

// collection

export interface Cat {
  id: string;
  createAt: number;
  age: string;
  communityId: string;
  color: string;
  details: string;
  name: string;
  popularity: number;
  sex: string;
  status: number;
  area: string;
  isSnipped: boolean;
  isSterilized: boolean;
  avatars: Array<string>;
}

export interface CatPreview {
  id: string;
  color: string;
  name: string;
  area: string;
  avatarUrl: string;
  isCollected: boolean;
}

// moment

export interface Moment {
  id: string;
  createAt: number;
  title: string;
  cats?: Array<CatPreview>;
  communityId: string;
  text: string;
  user: User;
  photos: Array<string>;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export const enum TargetType {
  Post = 1,
  Comment,
  Cat,
  Moment,
  Cat_Photo,
  User
}
