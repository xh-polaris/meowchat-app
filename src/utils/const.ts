export const enum StorageKeys {
  CommunityId = "communityId",
  UserId = "userId",
  AccessToken = "accessToken",
  HistoryCampuses = "historyCampuses",
  SearchText = "searchText",
  IsClickCollectionSearch = "isClickCollectionSearch",
  Search = "search",
  IsClickSearch = "isClickSearch",
  IdSelected = "idSelected",
  NameSelected = "nameSelected",
  AvatarSelected = "avatarSelected",
  DraftMoment = "draftMoment",
  DraftPost = "draftPost",
  BackendEnv = "backendEnv",
  BackendLane = "backendLane",
  EnabledDebug = "enableDebug"
}

export const enum BackendEnv {
  Product = "pro",
  Test = "test"
}

// WxAppId在init.ts、upload.mjs、manifest.json里使用
export const WxAppId = "wxd7e995c7b9d793b8";
