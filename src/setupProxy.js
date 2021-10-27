const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:3000',
    changeOrigin: true, // 控制服务器收到的请求头中Host字段的值
    pathRewrite: { // 重写请求路径(必须)
      '^/api': ''
    }
  }))
}