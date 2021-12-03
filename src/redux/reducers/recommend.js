import { BANNER, PERSONALIZED, NEWSET, LIST, HOTSINGER, HOTANCHOR } from "../constant";

const initState = {
  banner: {},
  newSet: [],
  personalized: [],
  hotAnchor: [],
  hotSinger: [],
  list: {}
};
export default function countReducer (preState = initState, action) {
  // 从action对象中获取type, data
  const { type } = action;

  // 根据type决定如何加工数据
  switch (type) {
    case BANNER:
      return { ...preState, [BANNER]: action[BANNER] };
    case PERSONALIZED:
      return { ...preState, [PERSONALIZED]: action[PERSONALIZED] };
    case NEWSET:
      return { ...preState, [NEWSET]: action[NEWSET] };
    case LIST:
      return { ...preState, [LIST]: action[LIST] };
    case HOTSINGER:
      return { ...preState, [HOTSINGER]: action[HOTSINGER] };
    case HOTANCHOR:
      return { ...preState, [HOTANCHOR]: action[HOTANCHOR] };
    default:
      return preState;
  }
}