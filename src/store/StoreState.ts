export interface userInfoType {
  userName: string;
  jurisdictions: string;
  pic: string;
  token?: string;
}

export interface StoreState {
  isLogin?: boolean;
  userInfo?: userInfoType;
}

export interface SetLoginType extends StoreState{
  type?: string;
}