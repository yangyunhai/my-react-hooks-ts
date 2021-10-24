import { createStore } from 'redux';
import { StoreState, SetLoginType } from './StoreState';
import { ReducerType } from '@/store/ReducerType';

import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'app-user',
  storage: storage,
  stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const defaultSate: StoreState = {
  isLogin: false,
  userInfo: {
    userName: '',
    roles: '',
    pic:''
  }
};

const reducer = (state: StoreState=defaultSate, action: SetLoginType) => {
  switch (action.type) {
    case ReducerType.setLogin:
      state.isLogin = action.isLogin;
      state.userInfo = action.userInfo;
      break;
  }
  return {...state};
};

const myPersistReducer = persistReducer(persistConfig, reducer)
const store = createStore(myPersistReducer)

export const persistor = persistStore(store)
export default store;
