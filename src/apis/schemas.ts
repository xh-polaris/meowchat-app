export interface Status {
  code: number;
  msg: string;
}

// user

export interface User {
  id: string;
  nickname: string;
  avatarUrl: string;
}

export interface Auth {
  authType: string;
  authId: string;
}

// comment

export interface Comment {
  id: string;
  likes: number;
  createAt: number;
  text: string;
  user: User;
  comments: number;
  replyName?: string;
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
  user: User;
  status: number;
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
  catId?: string;
  communityId: string;
  text: string;
  user: User;
  photos: Array<string>;
}
export interface MomentData {
  id: string;
  createAt: number;
  title: string;
  catId?: string;
  communityId: string;
  text: string;
  user: User;
  photos: Array<string>;
  likedNumber: number;
}
export const enum TargetType {
  Post = 1,
  Comment,
  Cat,
  Moment,
  Cat_Photo
}
