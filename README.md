# 基于React + Antd 实现的简易版网易云音乐
  根目录下创建 config-overrides.js 文件, 用于配置路径别名和antd组件按需加载。
  src目录下创建setupProxy.js文件, 用于配置代理。

  通过react-redux来实现状态管理。
  引入redux-thunk, 用于支持异步action, 异步action中一般都会调用同步action
  通过Provider, 把store挂在最外层

  通过Suspense在最外层挂载加载组件。
## 后台代码使用了 Binaryify 老哥提供的网易云API, (https://github.com/Binaryify/NeteaseCloudMusicApi)[https://github.com/Binaryify/NeteaseCloudMusicApi]




