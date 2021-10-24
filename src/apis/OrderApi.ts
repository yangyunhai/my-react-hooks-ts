/** 
 * 订单模块接口
 */
import { httpPost, ResponetFrom } from './request';

/**
 * 查询订单列表
 * @param params
 * @returns
 */
const getOrderList = (params: any): Promise<ResponetFrom> => {
  return httpPost('/order/getOrderList', params);
};

/**
 * 查询商品列表
 * @param params
 * @returns
 */
const getBusinessList = (params: any): Promise<ResponetFrom> => {
  return httpPost('/order/getBusinessList', params);
};

export default {
  getOrderList,
  getBusinessList
};
