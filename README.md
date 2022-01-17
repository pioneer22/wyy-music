# 基于React + Ant.design 实现的简易版网易云音乐

  - 根目录下创建 config-overrides.js 文件, 用于配置路径别名和antd组件按需加载。
  - src目录下创建setupProxy.js文件, 用于配置代理。
  - 通过Provider, 把store挂在最外层
  - 通过Suspense在最外层挂载加载组件。

## 主要技术栈
  - redux + react-redux + redux-thunk + sass + axios + react-router-config + react-transition-group
  - 通过react-redux来实现状态管理。
  - 引入redux-thunk, 用于支持异步action, 异步action中一般都会调用同步action。
  - 通过react-router-config实现路由集中管理。
  - 通过react-transition-group实现动画过渡效果。

## 主要实现功能模块
  - 登录功能：
    -只实现了手机号登录。
    ![](https://s4.ax1x.com/2021/12/06/osNuVS.gif)

  - 搜索功能： 
    实现歌曲, 专辑, 歌手的搜索。使用函数防抖优化搜索。可直接通过动态搜索结果直接进入相关页面。
    ![](https://s4.ax1x.com/2021/12/06/osNlCj.gif)

  - 主播电台:
    ![](https://s4.ax1x.com/2021/12/06/osNUVU.gif)
  
  - 新碟上架: 
    ![](https://s4.ax1x.com/2021/12/06/osNJK0.gif)

  - 热门推荐:
    ![](https://s4.ax1x.com/2021/12/06/osNM5Q.gif)

  - 歌手: 
    ![](https://s4.ax1x.com/2021/12/06/osN8vq.gif)

  - 歌单:
    ![](https://s4.ax1x.com/2021/12/06/osNYrV.gif)

  - 排行榜: 
    ![](https://s4.ax1x.com/2021/12/06/osN18s.gif)

  - 播放歌曲：
    ![](https://s4.ax1x.com/2021/12/06/osdUVf.jpg)

## 说明：
  1. 默认播放列表, 通过保存5个歌曲id, 进入程序请求歌曲信息, 默认播放为列表第一条。
  2. 歌曲播放模式, 分为顺序播放, 循环播放, 单曲循环, 通过判断012, 来实现。
  3. 歌词播放, 通过判断当前歌词的时间结尾得知播放到哪句歌词, 通过scrollTo来实现歌词上移。 
  4. 将当前播放歌曲保存在redux, 对于没版权的歌曲直接跳过, 播放下一首歌曲。
  
## 后台API：感谢[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)老哥提供的接口。

## 已用hooks改写, 详细代码见hook分支。





