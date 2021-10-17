import { RouterType } from '@/routes/interface';

/**
 * 根据登录权限过滤菜单
 * @param routes
 * @param roles
 * @returns
 */
export const filterRoute2Path = (
   routes: Array<RouterType>,
   roles: string
  ): any => {
  const filterList: Array<Array<RouterType>> = routes
    .filter(route => {
      return roles && roles.indexOf(route.key) != -1;
    })
    .map((route: RouterType) => {
      return route.children.filter(route => {
        return roles && roles.indexOf(route.key) != -1;
      });
    });
  return filterList.length > 0 && filterList[0][0] ? filterList[0][0].path : '';
};
