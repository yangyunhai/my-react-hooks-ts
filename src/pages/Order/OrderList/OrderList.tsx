import React, { FC, useState,useEffect } from 'react';
import { Table,Form, Input, Button } from 'antd';
import OrderApi from '@/apis/OrderApi'
interface TableColumnType {
  title: string,
  dataIndex: string,
  key:string,
}

interface TableDataType {
  title: string,
  dataIndex: string,
  key:string,
}

const columns:Array<TableColumnType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '用户性别',
    dataIndex: 'userSex',
    key: 'userSex',
  },
  {
    title: '商品名称',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: '下单时间',
    key: 'createtime',
    dataIndex: 'createtime',
  },
  {
    title: '送货地址',
    key: 'address',
    dataIndex: 'address',
  }
];

const OrderList: FC = () => {
  const [tableList,setTableList]=useState<Array<TableDataType>>([]);
  const [tableLoading,setTableLoading]=useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish=(fieldsValue: any)=>{
    onQuery(fieldsValue);
  }

  const onQuery=(fieldsValue:any={})=>{
    setTableLoading(true)
    OrderApi.getOrderList(fieldsValue).then((res)=>{
      setTableList(res.list)
    }).finally(()=>{
      setTableLoading(false)
    })
  }

  useEffect(()=>{
    onQuery();
  },[])
  return (
    <section className="main-page-warp order-list-warp">
      <Form
        className="main-page-table-form"
        layout='inline'
        form={form}
        onFinish={onFinish}>

        <Form.Item label="用户名称">
          <Input placeholder="请输入用户名称!" />
        </Form.Item>

        <Form.Item label="商品名称">
          <Input placeholder="请输入商品名称!" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">查询</Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={tableList} loading={tableLoading}/>
    </section>
  );
};

export default OrderList;
