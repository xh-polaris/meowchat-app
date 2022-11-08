export interface Carousel {
  id: string
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
  code: number
  msg: string
  cats: Array<CatPreview>
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
