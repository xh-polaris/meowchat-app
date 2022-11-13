export interface News {
  id: string
  imageUrl: string
  linkUrl: string
  linkType: string
}

export interface GetNewsResp {
  code: number
  msg: string
  news: News[]
}

export interface Cat {
    id: string;
    createAt: string;
    age: string;
    campusId: string;
    color: string;
    details: string;
    name: string;
    popularity: number;
    sex: string;
    status: number;
    area: string;
    isSnipped: boolean;
    isSterilized: boolean;
    avatars: string[];
}

export interface CatPreview {
    /**
     * 出没区域
     */
    area: string;
    /**
     * 花色
     */
    color: string;
    /**
     * 封面链接
     */
    coverUrl: string;
    id: string;
    /**
     * 是否被当前用户收藏
     */
    isCollected: boolean;
    /**
     * 名字
     */
    name: string;
}

export interface GetCatPreviewsResp {
    code: number;
    msg: string;
    cats: Array<CatPreview>;
}

export interface GetMomentPreviewsResp {
    /**
     * 状态码
     */
    code: number;
    moments: MomentPreview[];
    /**
     * 错误信息
     */
    msg: string;
}

/**
 * MomentPreview
 */
export interface MomentPreview {
    /**
     * 是否以某猫咪身份发布
     */
    catId?: string;
    /**
     * 封面
     */
    coverUrl: string;
    createAt: string;
    id: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 发布用户预览
     */
    user: UserPreview;
}

export interface GetMomentReq {
    momentId: string;
}

export interface GetMomentResp {
    code: number;
    moment: Moment;
    msg: string;
}

export interface Moment {
    id: string;
    createAt: string;
    updateAt?: string;
    /**
     * 标题
     */
    title: string;
    catId?: string;
    text: string;
    /**
     * 发布用户预览
     */
    user: UserPreview;
    imageUrls: Array<string>;
    /**
     * 是否以某猫咪身份发布
     */
    catId?: string;
    /**
     * 封面
     */
    coverUrl: string;
    createAt: string;
    id: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 发布用户预览
     */
    user: UserPreview;
}

export interface GetMomentReq {
    momentId: string;
}

export interface GetMomentResp {
    code: number;
    moment: Moment;
    msg: string;
}

export interface Moment {
    id: string;
    createAt: string;
    updateAt?: string;
    /**
     * 标题
     */
    title: string;
    catId?: string;
    text: string;
    /**
     * 发布用户预览
     */
    user: UserPreview;
    imageUrls: Array<string>;
}

/**
 * 发布用户预览
 *
 * UserPreview
 */
export interface UserPreview {
    /**
     * 头像
     */
    avatarUrl: string;
    /**
     * 昵称
     */
    nickname: string;
}

export interface Comment {
    id: string;
    likes: number;
    createAt: string;
    text: string;
    momentId: string;
    user: UserPreview;
    /**
     * 评论该评论的数量
     * **/
    comments: number;
}

export interface GetCommentsReq {
    /**
     momentId
     * */
    id: string;
}

export interface GetCommentsResp {
    code: string;
    msg: string;
    comments: Array<Comment>;
}

export interface ChildComment {
    id: string;
    likes: number;
    createAt: string;
    text: string;
    /**
     * 父评论id
     */
    parentCommentId: string;
    user: UserPreview;
}

export interface GetChildCommentsReq {
    /**
     momentId
     * */
    id: string;
}

export interface GetChildCommentsResp {
    code: string;
    msg: string;
    comments: Array<ChildComment>;
}





