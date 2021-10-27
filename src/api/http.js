import { service } from './axios';
/*
 * url: 请求url
 * params: 请求的参数
 * config: 请求时的header信息
 * method: 请求方法
*/

let headers = {
  get: 'application/x-www-form-urlencoded;charset=utf-8',
  post: 'application/json;charset=utf-8'
}

export const request = function ({ url, params = {}, config = {}, method = 'get' }) {
  // get请求，需要拼接参数
  let str = '';
  if (method === 'get' && params) {
    Object.keys(params).forEach(item => {
      str += `${item}=${params[item]}&`
    })
  }

  if (!config[method])
    config[method] = headers[method];

  // 拼接url
  url = '/api' + url;
  return new Promise((resolve, reject) => {
    service[method](str ? (url + '?' + str.substring(0, str.length - 1)) : url, params, Object.assign({}, config)).then(response => {
      resolve(response.data);
    }, err => {
      if (err.Cancel) {

      } else {
        reject(err)
      }
    }).catch(err => {
      reject(err)
    })
  })
};