export interface userInfoType {
  userName: string;
  roles: string;
}

export interface StoreState {
  isLogin?: boolean;
  userInfo?: userInfoType;
}


export interface SetLoginType extends StoreState{
  type?: string;
}