import React, { FC, useState,useEffect } from 'react';
import { Table,Form, Input, Button } from 'antd';
import UserApi from '@/apis/UserApi';
import './UserList.less';
import { TableColumnType, TableDataType } from '@/Interface/common';

const columns:Array<TableColumnType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名称',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '性别',
    key: 'userSex',
    dataIndex: 'userSex',
  },
  {
    title: '用户头像',
    key: 'pic',
    dataIndex: 'pic',
    render: (text:any, record:any) => (
       <img className='img' src={ record.pic }/>
    ),
  },
  {
    title: '创建时间',
    key: 'createtime',
    dataIndex: 'createtime',
  }
];

const UserList: FC = () => {
  const [tableList,setTableList]=useState<Array<TableDataType>>([]);
  const [tableLoading,setTableLoading]=useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish=(fieldsValue: any)=>{
    onQuery(fieldsValue);
  }

  const onQuery=(fieldsValue:any={})=>{
    setTableLoading(true)
    UserApi.getUserList(fieldsValue).then((res)=>{
      setTableList(res.list)
    }).finally(()=>{
      setTableLoading(false)
    })
  }

  useEffect(()=>{
    onQuery();
  },[])
  return (
    <section className='main-page-warp user-list-warp'>
      <Form
        className='main-page-table-form'
        layout='inline'
        form={form}
        onFinish={onFinish}>

        <Form.Item label='用户名称'>
          <Input placeholder='请输入用户名称!' />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' type='primary'>查询</Button>
        </Form.Item>
      </Form>

      <Table columns={ columns } dataSource={ tableList } loading={ tableLoading }/>
    </section>
  );
};

export default UserList;