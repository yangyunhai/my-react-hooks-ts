import React, { FC, useState, useEffect } from 'react';
import { Menu, MenuTheme } from 'antd';
import routes from '@/routes/index';
import { RouterType } from '@/routes/interface';
import { useHistory, Link } from 'react-router-dom';

interface menKey {
  selectKeys: Array<string>;
  keys: Array<string>;
}

interface Props {
  roles: string;
}

const { SubMenu } = Menu;

const getMenuKeys = (pathname: string): menKey => {
  let keys: Array<string> = [];
  let selectKeys: Array<string> = [];
  const getMenMap = (item, routesList) => {
    if (routesList && routesList.length > 0) {
      routesList.map((citem: RouterType) => {
        if (citem.path === pathname) {
          keys.push(item.key);
          selectKeys.push(citem.key);
        } else {
          getMenMap(item, citem.children);
        }
        return citem;
      });
    }
  };
  getMenMap(routes[0], routes);
  return { selectKeys, keys };
};

const Mens: FC<Props> = (props: Props) => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<Array<string>>([]);
  const [theme] = useState<MenuTheme>('light');
  const history = useHistory();

  const onHandleClick = event => {
    const key=event.keyPath[event.keyPath.length-1]
    setDefaultOpenKeys([key]);
    setSelectedKeys([event.key]);
  };

  useEffect(() => {
    const keys = getMenuKeys(history.location.pathname);
    if (keys.keys.length > 0) {
      setDefaultOpenKeys(keys.keys);
      setSelectedKeys(keys.selectKeys);
    }
  }, [history.location.pathname]);
  return (
    <Menu
      theme={ theme }
      style={ { width: 256 } }
      selectedKeys={ selectedKeys }
      openKeys={ defaultOpenKeys }
      onClick={ onHandleClick }
      mode="inline">
      {routes
        .filter(route => {
          return props.roles && props.roles.indexOf(route.key) !== -1;
        })
        .map((route: RouterType) => {
          return (
            <SubMenu key={route.key} title={route.title}>
              {route.children
                .filter(route => {
                  return props.roles && props.roles.indexOf(route.key) !== -1;
                })
                .map((croute: RouterType) => {
                  return (
                    <Menu.Item key={croute.key}>
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
