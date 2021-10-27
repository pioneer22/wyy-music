import axios from 'axios';

/* 请求拦截器 */
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token
    // 如果存在, 则统一在http请求的header都加上token, 后台根据token 判断登录情况, token一般是用户登录后存储到localstorage
    // eslint-disable-next-line no-undef
    let token = LocalStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.reject(error)
);

/* 响应拦截器 */
axios.interceptors.response.use(response => {
  // 如果返回状态码200, 说明请求接口成功, 否则抛出错误
  if (response.code === 200) {
    if (response.data.code === 511) {
      // 未授权,调取授权接口
    } else if (response.data.code === 510) {
      // 未登录,跳转登录页
    } else {
      return Promise.resolve(response);
    }
  } else {
    return Promise.reject(response);
  }
}, error => {
  // 对异常状态做统一处理
  if (error.response.status) {
    // 处理请求失败情况
    // 对不同返回码进行相应的处理
    return Promise.reject(error.response);
  }
})

/* 设置请求头与超时时间, 创建实例, 自定义配置 */
export const service = axios.create({
  timeout: 15000, // 请求15S超时
  /*   baseURL: '',
    headers: {} */
});