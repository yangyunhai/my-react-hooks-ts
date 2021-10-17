import React, { FC, useState,useEffect } from 'react';
import { Table } from 'antd';
import UserApi from '@/apis/UserApi'
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
  const onQuery=()=>{
    setTableLoading(true)
    UserApi.getOrderList({}).then((res)=>{
      debugger
      setTableList(res.data)
    }).finally(()=>{
      setTableLoading(false)
    })
  }

  useEffect(()=>{
    onQuery();
  },[])
  return (
    <section className="page-warp order-list-warp">
      <Table columns={columns} dataSource={tableList} loading={tableLoading}/>
    </section>
  );
};

export default OrderList;
