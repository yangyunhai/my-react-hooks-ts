import { Layout, Form, Input, Button, Checkbox } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import routes from '@/routes/index';
import { dispatchLogin } from '@/store/Actions';
import useLocalStorage from '@/hooks/useLocalStorage';
import { userInfoType } from '@/store/StoreState';
import { filterRoute2Path } from '@/uilts/index';
import './Login.less';

const Login: FC = () => {
  const [,writeState]=useLocalStorage('token','');
  const dispatch = useDispatch();
  const history = useHistory();
  
  const onFinish = (values: any) => {
    //模拟获取数据了
    const userInfo:userInfoType={userName:'鬼鬼',roles:'order,order-list,business-list'};
    const token=new Date().getTime().toString();
    dispatch(dispatchLogin({isLogin:true,userInfo}));
    writeState(token);
    console.log(filterRoute2Path(routes,userInfo.roles))
    history.push("/user/user-role");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                size="large"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
