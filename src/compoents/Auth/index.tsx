import { StoreState, userInfoType } from '@/store/StoreState';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  authKey?: string;
  children:any
}

const Auth: FC<Props> = (props: Props) => {
  const userInfo:userInfoType = useSelector((state:StoreState) => state.userInfo);
  const { authKey } = props;
  //没传递权限字段返回空
  if (!userInfo.auths || !authKey) return null;
  //如果没有权限则返回空
  return (userInfo.auths.indexOf(authKey)!=-1 ?props.children: null);
};

export default Auth;