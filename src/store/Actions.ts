import { SetLoginType } from './StoreState';
import { ReducerType } from './ReducerType';

/**
 * 设置登录状态
 * @param action 
 */
export const dispatchLogin = (action:SetLoginType) => {
  return {
    type: ReducerType.setLogin,
    isLogin: action.isLogin,
    userInfo: action.userInfo,
  }
};
