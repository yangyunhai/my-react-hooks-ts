import { lazy } from 'react';
import { RouterType } from './interface';

const OrderList = lazy(() => import('@/pages/Order/OrderList/OrderList'));
const BusinessList = lazy(() => import('@/pages/Order/BusinessList/BusinessList'));

const Routers: RouterType[] = [
  {
    path: '/order',
    key: 'order',
    title:'订单管理',
    children:[
      {
        path: '/order/order-list',
        key: 'order-list',
        component: OrderList,
        title:'订单列表',
      },
      {
        path: '/order/business-list',
        key: 'business-list',
        component: BusinessList,
        title:'商品列表',
      }
    ]
  }
];

export default Routers;