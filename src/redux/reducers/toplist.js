import { SELECTLIST, TOPLISTS, PLAYLISTDETAIL } from '../constant'

const initState = {};
export default function countReducer (preState = initState, action) {
  // 从action对象中获取type, data
  const { type } = action;

  // 根据type决定如何加工数据
  switch (type) {
    case SELECTLIST:
      return { ...preState, [SELECTLIST]: action[SELECTLIST] };
    case TOPLISTS:
      return { ...preState, [TOPLISTS]: action[TOPLISTS] };
    case PLAYLISTDETAIL:
      return { ...preState, [PLAYLISTDETAIL]: action[PLAYLISTDETAIL] };
    default:
      return preState;
  }

}