/* 
  该文件用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入createStore，专门创建redux中最为核心的store对象
import { createStore, applyMiddleware } from 'redux'

// 引入redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入redux-thunk, 用于支持异步action, 异步action中一般都会调用同步action
import thunk from 'redux-thunk'

// 引入汇总之后的reducer
import allResource from "./reducers"

// 暴露store
export default createStore(allResource, composeWithDevTools(applyMiddleware(thunk),))