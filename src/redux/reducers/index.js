/* 
  汇总所有reducer为一个总的reducer
*/

// 引入为Recommend组件服务的reducer
import recommend from './recommend'
import banner from './banner'
import toplist from './toplist'
import header from './header'
import playerBar from './player-bar'

// 引入combineReducers， 用于汇总多个reducer
import { combineReducers } from 'redux'

// 汇总所有reducers
export default combineReducers({
  recommend,
  banner,
  toplist,
  header,
  playerBar
})