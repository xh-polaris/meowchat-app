export interface PutObjectReq {
  /**
   * 文件所属目录，""表示根目录，不需要以'/'结尾
   */
  prefix?: string;
  /**
   * 本地文件路径
   */
  filePath: string;
}

export interface PutObjectResp {
  url: string;
}
