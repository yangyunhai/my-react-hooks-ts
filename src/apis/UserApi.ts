import { httpGet, ResponetFrom } from './request';

/**
 * 查询订单列表
 * @param params 
 * @returns 
 */
const getOrderList = (params: any): Promise<ResponetFrom> => {
  return httpGet('/order/getOrderList', params);
};

export default {
  getOrderList
};
