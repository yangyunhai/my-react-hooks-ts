import { Layout, Form, Input, Button, Checkbox,notification  } from 'antd';
import React, { FC,useState } from 'react';
import './Login.less';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import routes from '@/routes/index';
import { dispatchLogin } from '@/store/Actions';
import { userInfoType } from '@/store/StoreState';
import { filterRoute2Path } from '@/uilts/index';
import useLocalStorage from '@/hooks/useLocalStorage';
import UserApi from '@/apis/UserApi';
import { LoginType } from '@/Interface/common';

const Login: FC = () => {
  const [,writeState]=useLocalStorage('token','');
  const [loading,setLoading] =useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onShowMsg=(msg:string)=>{
    notification.error({
      message: '温馨提示',
      description:msg,
    });
  }

  const onFinish = (values: LoginType) => {
    UserApi.login(values)
    .then((res:any)=>{
      const userInfo:userInfoType={userName:values.userName,...res.data};
      if(userInfo.jurisdictions){
        //存储用户信息
        dispatch(dispatchLogin({isLogin:true,userInfo}));
        //独立存储token
        writeState(userInfo.token);
        //根据账号权限获取默认第一个跳转页面
        const homePath=filterRoute2Path(routes,userInfo.jurisdictions);
        history.push(homePath);
      }else{
        onShowMsg('暂无权限!');
      }
    })
    .catch(()=>{
      writeState('');
      onShowMsg('账号或密码错误!');
    })
    .finally(()=>{
      setLoading(false)
    })
  };

  return (
    <Layout className="login-warp">
      <div className="login-container">
        <div className="login-left"></div>
        <div className="login-right">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ userSetNumber: true }}
            onFinish={ onFinish }
            autoComplete="off">
            <Form.Item
              label="登录名称"
              name="userName"
              rules={[{ required: true, message: '请输入登录名称!' }]}>
              <Input placeholder="请输入登录名称" size="large" />
            </Form.Item>

            <Form.Item
              label="登录密码"
              name="userPassword"
              rules={[{ required: true, message: '请输入登录密码!' }]}>
              <Input.Password placeholder="请输入登录密码" size="large" />
            </Form.Item>

            <Form.Item
              name="userSetNumber"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                loading={ loading }
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}>
                登录（账号随便输入）
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
