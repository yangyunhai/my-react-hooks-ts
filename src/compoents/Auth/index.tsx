import { StoreState, userInfoType } from '@/store/StoreState';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  jurisdictionKey?: string;
  children:any
}

const Auth: FC<Props> = (props: Props) => {
  const userInfo:userInfoType = useSelector((state:StoreState) => state.userInfo);
  const { jurisdictionKey } = props;
  //没传递权限字段返回空
  if (!userInfo.jurisdictions || !jurisdictionKey) return null;
  //如果没有权限则返回空
  return (userInfo.jurisdictions.indexOf(jurisdictionKey)!==-1 ?props.children: null);
};

export default Auth;