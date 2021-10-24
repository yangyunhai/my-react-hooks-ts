/** 
 * 用户模块接口
 */
 import { httpGet, ResponetFrom } from './request';

 /**
  * 查询用户列表
  * @param params
  * @returns
  */
 const getUserList = (params: any): Promise<ResponetFrom> => {
   return httpGet('/user/getUserList', params);
 };
 
 /**
  * 查询角色列表
  * @param params
  * @returns
  */
 const getRoleList = (params: any): Promise<ResponetFrom> => {
   return httpGet('/user/getRoleList', params);
 };
 
 export default {
   getUserList,
   getRoleList
 };
 