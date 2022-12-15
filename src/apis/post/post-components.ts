import {User} from "@/apis/moment/moment-components";

/**
 * Post
 */
export interface Post {
    /**
     * 评论数
     */
    comments: number;
    /**
     * 封面
     */
    coverUrl?: string;
    /**
     * 发布时间
     */
    createAt: number;
    id: string;
    /**
     * 是否匿名
     */
    isAnonymous: boolean;
    /**
     * 点赞数
     */
    likes: number;
    /**
     * 审核状态
     */
    status: number;
    /**
     * 标签
     */
    tags: Tag[];
    /**
     * 详细内容
     */
    text: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 发帖人
     */
    user?: User;
}

/**
 * Tag
 */
export interface Tag {
    id: string;
    name: string;
}


export interface DeletePostReq {
    postId: string;
}

export interface DeletePostResp {
    code: number;
    msg: string;
}

export interface NewPostReq {
    id?: string; // 留空表示创建
    isAnonymous: boolean;
    title: string;
    text: string;
    coverURL?: string;
    tags: Tag[];
}

export interface NewPostResp {
    code: number;
    msg: string;
    momentId: string;
}

export interface GetPostPreviewsReq {
    page: number;
}

export interface GetPostPreviewsResp {
    code: number;
    msg: string;
    posts: Post[];
}

export interface GetPostDetailReq {
    postId: string;
}

export interface GetPostDetailResp {
    post: Post;
    code: number;
    msg: string;
}
