import React, { FC, useState,useEffect } from 'react';
import { Table,Form, Input, Button } from 'antd';
import UserApi from '@/apis/UserApi';
import './UserRole.less';
import { TableColumnType, TableDataType } from '@/Interface/common';

const columns:Array<TableColumnType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '角色名称',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    key: 'createtime',
    dataIndex: 'createtime',
  }
];

const UserRole: FC = () => {
  const [tableList,setTableList]=useState<Array<TableDataType>>([]);
  const [tableLoading,setTableLoading]=useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish=(fieldsValue: any)=>{
    onQuery(fieldsValue);
  }

  const onQuery=(fieldsValue:any={})=>{
    setTableLoading(true)
    UserApi.getRoleList(fieldsValue).then((res)=>{
      setTableList(res.list)
    }).finally(()=>{
      setTableLoading(false)
    })
  }

  useEffect(()=>{
    onQuery();
  },[])
  return (
    <section className='main-page-warp role-list-warp'>
      <Form
        className='main-page-table-form'
        layout='inline'
        form={form}
        onFinish={onFinish}>

        <Form.Item label='角色名称'>
          <Input placeholder='请输入角色名称!' />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' type='primary'>查询</Button>
        </Form.Item>
      </Form>

      <Table columns={ columns } dataSource={ tableList } loading={ tableLoading }/>
    </section>
  );
};

export default UserRole;