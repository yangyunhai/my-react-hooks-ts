import React, { FC } from 'react';
import routes from '@/routes/index';
import NoMatch from '../pages/NoMatch';
import { Route } from 'react-router-dom';
import { RouterType } from "@/routes/interface";
import Mens from "@/compoents/Mens";
import Breadcrumbs from "@/compoents/Breadcrumbs";
import Header from "@/compoents/Header";
import { useSelector } from 'react-redux';
import { userInfoType,StoreState } from '@/store/StoreState';

const getRouters=():Array<RouterType>=>{
  let list=[];
  routes.map((item)=>{
    list=list.concat(item.children?item.children:[]);
    return item;
  })
  return list;
}

const list:Array<RouterType>=getRouters();

const AppLayout: FC = () => {
  const userInfo:userInfoType = useSelector((state:StoreState) => state.userInfo);
  return (
    <section>
     <Header></Header>
      <div className="main-wrapper">
        <div className="main-mens">
          <Mens roles={userInfo.roles}></Mens>
        </div>
        <div className="main-com">
          <Breadcrumbs></Breadcrumbs>
          <Route path="/no-match" key="no-match">
            <NoMatch></NoMatch>
          </Route>
          {/* 其他路由 */}
          {
            list.filter((route)=>{
              return userInfo.roles&&userInfo.roles.indexOf(route.key)!==-1
            }).map(route => {
              return (
                <Route
                  path={route.path}
                  key={route.key}
                  component={route.component}></Route>
              );
            })
          }
        </div>
      </div>
    </section>
  );
};

export default AppLayout;
