import { lazy } from 'react';
import { RouterType } from './interface';

const UserList = lazy(() => import('@/pages/User/UserList/UserList'));
const UserRole = lazy(() => import('@/pages/User/UserRole/UserRole'));

const Routers: RouterType[] = [
  {
    path: '/user',
    key: 'user',
    title: '用户管理',
    children: [
      {
        path: '/user/user-list',
        key: 'user-list',
        component: UserList,
        title: '用户列表'
      },
      {
        path: '/user/user-role',
        key: 'user-role',
        component: UserRole,
        title: '角色列表'
      }
    ]
  }
];

export default Routers;
