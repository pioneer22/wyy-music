import { SAVESEARCHSELECT } from "../constant";

const initState = {};
export default function countReducer (preState = initState, action) {
  // 从action对象中获取type, data
  const { type, data } = action;

  // 根据type决定如何加工数据
  switch (type) {
    case SAVESEARCHSELECT:
      return { ...preState, searchSelect: data };
    default:
      return preState;
  }

}