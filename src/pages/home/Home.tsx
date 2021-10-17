import { Form, Input, Button, Checkbox } from 'antd'
import React,{ FC } from 'react'

const Home: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={ onFinish }
      onFinishFailed={ onFinishFailed }
      autoComplete="off">
      <Form.Item
        label="登录名称"
        name="userName"
        rules={[{ required: true, message: '请输入登录名称!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="userPassword"
        name="登录密码"
        rules={[{ required: true, message: '请输入登录密码!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="userSetNumber" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>记住密码</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Home