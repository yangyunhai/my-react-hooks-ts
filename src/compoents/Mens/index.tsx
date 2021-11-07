import React, { FC, useState } from 'react';
import { Menu, MenuTheme } from 'antd';
import './index.less';
import routes from '@/routes/index';
import { RouterType } from '@/routes/interface';
import { useHistory, Link } from 'react-router-dom';
import SvgIcon from '@/compoents/SvgIcon';

interface menKey {
  selectKeys: Array<string>;
  keys: Array<string>;
}

interface Props {
  jurisdictions: string;
}

const { SubMenu } = Menu;

/**
 * 根据当前页面路由key获取选中项
 * @param pathname 
 * @returns 
 */
const getMenuKeys = (pathname: string): menKey => {
  let keys: Array<string> = [];
  let selectKeys: Array<string> = [];
  const getSelectKey = (item:RouterType, routesList:Array<RouterType>) => {
    if (routesList && routesList.length > 0) {
      routesList.map((citem: RouterType) => {
        if (citem.path === pathname) {
          keys.push(item.key);
          selectKeys.push(citem.key);
        } else {
          getSelectKey(citem, citem.children);
        }
        return citem;
      });
    }
  };

  getSelectKey(routes[0], routes);
  return { selectKeys, keys };
};

/**
 * 根据权限过滤菜单
 * @param routeList 
 * @param jurList 
 * @returns 
 */
const filterMens=(
  routeList:Array<RouterType>,
  jurList:Array<string>)
  :Array<RouterType>=>{
  return routeList.filter((route:RouterType)=>{
    if(jurList.includes(route.key)){
      return route.children.filter((croute)=>{
        return jurList.includes(croute.key);
      });
    }else{
      return false;
    }
  })
}

const Mens: FC<Props> = (props: Props) => {
  const history = useHistory();
  const keys = getMenuKeys(history.location.pathname);
  const [selectedKeys, ] = useState<Array<string>>(keys.selectKeys);
  const [defaultOpenKeys, ] = useState<Array<string>>(keys.keys);
  const [theme] = useState<MenuTheme>('light');
  //因为key存储关键词重复的可能，所以转成数组
  const jurList:Array<string>=props.jurisdictions.split(',');
  //根据权限过滤菜单
  const menList:Array<RouterType>=filterMens(routes,jurList);
  return (
    <Menu
      className='menu-com'
      theme={ theme }
      style={ { width: 256 } }
      defaultSelectedKeys={ selectedKeys }
      defaultOpenKeys={ defaultOpenKeys }
      mode="inline">
      {/* 根据当前账号权限keys过滤有效菜单 */}
      {
       menList.map((route: RouterType) => {
          return (
            <SubMenu 
             key={route.key} 
             title={route.title} 
             icon={<SvgIcon className={'icon-'+route.key} icon={route.key}/>}>
              {
              route.children.map((croute: RouterType) => {
                  return (
                    <Menu.Item 
                     key={croute.key} 
                     icon={<SvgIcon className={'icon-'+croute.key} icon={croute.key}/>}>
                      <Link to={croute.path}>{croute.title}</Link>
                    </Menu.Item>
                  );
                })}
            </SubMenu>
          );
        })}
    </Menu>
  );
};
export default Mens;
