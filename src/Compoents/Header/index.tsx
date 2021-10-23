import { Avatar, Dropdown, Menu } from 'antd';
import React, { FC } from 'react';
import "./index.less";
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { dispatchLogin } from '@/store/Actions';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useDispatch,useSelector } from 'react-redux';
import { userInfoType,StoreState } from '@/store/StoreState';

const Header: FC = () => {
  const [,writeState]=useLocalStorage('token','');
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo:userInfoType = useSelector((state:StoreState) => state.userInfo);
  const onBack=()=>{
    dispatch(dispatchLogin({isLogin:false,userInfo:null}));
    writeState(null);
    history.push("/login");
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={ onBack }>退出</a>
      </Menu.Item>
    </Menu>
  );
  
  return (
    <div className="header-warp flex">
       <div className="flex-1">
       
       </div>
       <Dropdown overlay={menu}>
        <div className='pointer'> 
          <span className='m-r-10'>{userInfo.userName}</span>
          <Avatar size={ 46 } icon={ <UserOutlined /> } />
        </div>
      </Dropdown>
    </div>
  );
};
export default Header;
