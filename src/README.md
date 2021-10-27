## Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
    React中的副作用操作
      发送ajax请求数据获取
      设置订阅/启动定时器
      手动更改真实DOM 

    语法说明
      useEffect(() => {
        // 在此可以执行任何带副作用操作
        return () => { // 在组件卸载前执行
          // 在此做一些收尾工作，清除定时器/取消订阅等
        }
      }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次 render() 后执行

    可以把 useEffect Hook 看做如下三个函数的结合
      componentDidMount()
      componentDidUpdate()
      componentWillUnmount()

## Ref Hook
    1. Ref Hook可以在函数组件中存储 / 查找组件内的标签或任意其它数据
    2. 语法 const refContainer = useRef()
    3. 作用：保存标签对象, 功能与React.createRef() 一样
      
## 向组件内部动态传入带内容的结构(标签)？
    Vue中：
      使用slot技术, 也就是通过组件标签体传入结构： <A><B/></A>
    React中：
      使用children props: 通过组件标签体传入结构
      使用render props: 通过组件标签属性传入结构, 一般用render函数属性

    children props: 通过组件标签
    <A>
      <B>xxxxx</B>
    </A>
    {this.props.children}

    问题：如果B组件需要A组件内的数据， ===> 做不到

    render props: 
    <A render={data=><C data={data}/>}></A>
    A组件： {this.props.render(内部state数据)}
    C组件： 读取A组件传入的数据显示{this.props.data}

## 错误边界
用来捕获后代组件错误, 渲染出备用页面
只能捕获后代组件生命周期产生的错误, 不能捕获自己组件产生的错误和其他组件在合成事件, 定时器中产生的错误

使用方式: 
  getDerivedStateFromError配合componDidCatch
  // 生命周期函数, 一旦后台组件报错, 就会触发
  static getDerivedStateFromError(error){
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
      hasError: true
    }
  }

  componentDidCatch(error,info){
    // 统计页面的错误, 发送请求到后台去
    console.log(error,info)
  }

## 组件通讯方式总结

几种方式：
1. props
  children props
  render props
2. 消息订阅-发布：
  pubs-sub、event 等等
3. 集中式管理
  redux、dva等
4. conText
  生产者-消费者模式

比较好的搭配：
父子组件： props
兄弟组件： 消息订阅-发布、集中式管理
祖孙组件(跨级组件)：消息订阅-发布，集中式管理，conText(开发用的少, 封装插件用的多)