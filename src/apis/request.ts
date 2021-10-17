import axios from 'axios';
import qs from 'qs';
console.log(process.env.BASE_API);
//base api
enum types {
  POST = 'POST',
  GET = 'GET'
}

enum State {
  SUCCESS = 'POST',
  ERROR = 'GET'
}

export interface ResponetFrom {
  data: any;
  msg: State;
}

//拦截器部分
axios.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * http请求
 * @param options
 * @returns
 */
const request = (options: any): Promise<ResponetFrom> => {
  const axiosOptions = Object.assign(
    {
      transformResponse: [data => data],
      headers: {
        Accept: 'application/json',
        ContentType: 'application/json;charset=UTF-8'
      },
      withCredentials: false,
      timeout: 400000,
      paramsSerializer: params => qs.stringify(params),
      validateStatus: status => status >= 200 && status < 300,
      baseURL: process.env.BASE_API
    },
    options
  );

  const data: ResponetFrom = {
    data: null,
    msg: null
  };
  return new Promise(resolve => {
    axios(axiosOptions)
      .then((res: any) => {
        data.data = JSON.parse(res.data);
        data.msg = State.SUCCESS;
        resolve(data);
      })
      .catch(error => {
        data.data = error;
        data.msg = State.ERROR;
        resolve(data);
      });
  });
};

/**
 * http post请求方式
 * @param {*} url
 * @param {*} data
 */
export const httpPost = (
  url: string,
  data: any = {}
): Promise<ResponetFrom> => {
  return request({
    url,
    method: types.POST,
    data
  });
};

/**
 * http get请求方式
 * @param url
 * @param params
 * @returns
 */
export const httpGet = (
  url: string,
  params: any = {}
): Promise<ResponetFrom> => {
  return request({
    url,
    method: types.GET,
    params
  });
};

/**
 * http post formData 请求方式
 */
export const httpFormData = (
  url: string,
  params: any = {}
): Promise<ResponetFrom> => {
  const headers = {
    ['Content-Type']: 'multipart/form-data'
  };
  const formData = new FormData();
  for (const field in params) {
    if (params[field]) {
      formData.append(field, params[field]);
    }
  }
  return request({
    url,
    method: types.POST,
    data: formData,
    headers
  });
};

export default {
  httpPost,
  httpGet,
  httpFormData
};
