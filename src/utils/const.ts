export const enum StorageKeys {
  CommunityId = "communityId",
  UserId = "userId",
  AccessToken = "accessToken",
  HistoryCampuses = "historyCampuses",
  IdSelected = "idSelected",
  NameSelected = "nameSelected",
  AvatarSelected = "avatarSelected",
  DraftMoment = "draftMoment",
  DraftPost = "draftPost",
  BackendEnv = "backendEnv",
  BackendLane = "backendLane",
  EnabledDebug = "enableDebug",
  HistorySearchText = "historySearchText"
}

export const enum BackendEnv {
  Product = "pro",
  Test = "test"
}

export const BackendEnvMap = {
  release: BackendEnv.Product,
  trial: BackendEnv.Test,
  develop: BackendEnv.Test
};

export const AppId = 1;
