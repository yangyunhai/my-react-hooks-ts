import { Button,  Form, Input, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { FC, useState } from 'react';

interface propsType{
  onOk:(values:any)=>void,
  onCancel:(values:any)=>void,
  data:any
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const AddBusines: FC<propsType> = (props:propsType) => {
  const [loading,setLoading]=useState<boolean>(false);
  const [imageUrl,setImageUrl]=useState<string>(null);
  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const onChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj,(imageUrl) =>{
        setLoading(true);
        setImageUrl(imageUrl);
      })
    }
  };

  const onFinish = (values: any) => {
    props.onOk(values)
  };  

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="add-business-warp">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ userSetNumber: true }}
        onFinish={ onFinish }
        onFinishFailed={ onFinishFailed }
        autoComplete="off">
        <Form.Item
          label="商品名称"
          name="title"
          rules={[{ required: true, message: '请输入商品名称!' }]}>
          <Input placeholder="请输入商品名称"/>
        </Form.Item>

        <Form.Item
          label="商品数量"
          name="num"
          rules={[{ required: true, message: '请输入商品数量!' }]}>
          <Input placeholder="请输入商品数量"/>
        </Form.Item>

        <Form.Item
          label="创建用户"
          name="userName"
          rules={[{ required: true, message: '请输入创建用户!' }]}>
          <Input placeholder="请输入创建用户"/>
        </Form.Item>

        <Form.Item
          label="商品封面"
          name="num"
          rules={[{ required: true, message: '请选择封面!' }]}>
          <Upload
          name="pic"
          listType="picture-card"
          showUploadList={ false }
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={ onChange }>
          {imageUrl ? <img src={ imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
         </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">确认</Button>
          <Button className="m-l-20" type="primary" onClick={props.onCancel}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddBusines;