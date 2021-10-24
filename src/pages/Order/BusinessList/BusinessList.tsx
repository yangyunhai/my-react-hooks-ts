import React, { FC, useState,useEffect, lazy } from 'react';
import { Table,Form, Input, Button } from 'antd';
import OrderApi from '@/apis/OrderApi';
import './BusinessList.less';
import DynamicModal from '@/compoents/DynamicModal';
import { comMapInte, TableColumnType, TableDataType } from '@/Interface/common';
import Auth from '@/compoents/Auth';
const AddBusines=lazy(() => import('./AddBusines'));

const columns:Array<TableColumnType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '商品名称',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: '商品封面',
    key: 'pic',
    dataIndex: 'pic',
    render: (text:any, record:any) => (
       <img className='img' src={ record.pic }/>
    ),
  },
  {
    title: '销售数量',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: '商品库存',
    dataIndex: 'sumNum',
    key: 'sumNum',
  },
  {
    title: '创建用户',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '创建时间',
    key: 'createtime',
    dataIndex: 'createtime',
  }
];

const comMap:comMapInte={
  'AddBusines':{
    title:'添加商品',
    comKey:'AddBusines'
  }
}

const BusinessList: FC = () => {
  const [tableList,setTableList]=useState<Array<TableDataType>>([]);
  const [tableLoading,setTableLoading]=useState<boolean>(false);
  const [visible,setVisible]=useState<boolean>(false);
  const [comKey,setComKey]=useState<string>(null);
  const [form] = Form.useForm();

  const onFinish=(fieldsValue: any)=>{
    onQuery(fieldsValue);
  }

  const onQuery=(fieldsValue:any={})=>{
    setTableLoading(true)
    OrderApi.getBusinessList(fieldsValue).then((res)=>{
      setTableList(res.list)
    }).finally(()=>{
      setTableLoading(false)
    })
  }

  const onOk=()=>{
    setVisible(false);
  }
  const onCancel=()=>{
    setVisible(false);
  }
  const onAdd=(comKey:string)=>{
    setComKey(comKey);
    setVisible(true);
  }

  const getChiCom=()=>{
    switch(comKey){
      case comMap.AddBusines.comKey:
        return <AddBusines onOk={ onOk } onCancel={ onCancel } data={{}}/>
    }
  }

  useEffect(()=>{
    onQuery();
  },[])
  return (
    <section className='main-page-warp business-list-warp'>
      <Form
        className='main-page-table-form'
        layout='inline'
        form={form}
        onFinish={onFinish}>

        <Form.Item label='用户名称'>
          <Input placeholder='请输入用户名称!' />
        </Form.Item>

        <Form.Item label='商品名称'>
          <Input placeholder='请输入商品名称!' />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' type='primary'>查询</Button>
          <Auth authKey='add-business'>
            <Button className='m-l-20' type='primary' onClick={ ()=>onAdd('AddBusines') }>新增商品</Button>
          </Auth>
        </Form.Item>
      </Form>

      <Table columns={ columns } dataSource={ tableList } loading={ tableLoading }/>

      <DynamicModal {...comMap[comKey]} visible={ visible } onCancel={ onCancel }>
        { getChiCom() }
      </DynamicModal>
    </section>
  );
};

export default BusinessList;
