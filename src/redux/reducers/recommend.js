import { SAVEPERSONALIZED, SAVENEWSET, SAVEPLAYLIST, SAVEHOTSINGER, SAVEHOTANCHER } from "../constant";

const initState = {};
export default function countReducer (preState = initState, action) {
  // 从action对象中获取type, data
  const { type, data } = action;

  // 根据type决定如何加工数据
  switch (type) {
    case SAVEPERSONALIZED:
      return { ...preState, personalized: data };
    case SAVENEWSET:
      return { ...preState, newSet: data };
    case SAVEPLAYLIST:
      return { ...preState, playList: data };
    case SAVEHOTSINGER:
      return { ...preState, hotSinger: data };
    case SAVEHOTANCHER:
      return { ...preState, hotAnchor: data };
    default:
      return preState;
  }
}