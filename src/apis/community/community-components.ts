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

export interface GetMomentsByCatReq {
    catId: string;
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
    imageUrls?: Array<string>;
}

export interface CreateMomentReq {
    moment: Moment;
}

export interface CreateMomentResp {
    code: string;
    msg: string;
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
    momentId: string;
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
    commentId: string;
}

export interface GetChildCommentsResp {
    code: string;
    msg: string;
    comments: Array<ChildComment>;
}

/**
 * school
 */
export interface School {
    /**
     * 学校Id
     */
    id: string;
    /**
     * 学校姓名
     */
    schoolName: string;
}

export interface GetAllSchoolsResp {
    code: string;
    msg: string;
    comments: Array<School>;
}

/**
 * campus
 */
export interface Campus {
    /**
     * 校区名字
     */
    campusName: string;
    /**
     * 校区Id
     */
    id: string;
    /**
     * 所属学校Id
     */
    schoolId: string;
}

export interface GetCampusesBySchoolReq {
    schoolId: string;
}

export interface GetCampusesBySchoolResp {
    code: string;
    msg: string;
    comments: Array<Campus>;
}



