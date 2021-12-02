import { SEARCHSELECT, SHOWLOGINFRAME, USERMSG } from "../constant";

const initState = {
  searchSelect: {},
  showLoginFrame: false,
  userMsg: {}
};
export default function countReducer (preState = initState, action) {
  // 根据type决定如何加工数据
  switch (action.type) {
    case SEARCHSELECT:
      return { ...preState, [SEARCHSELECT]: action[SEARCHSELECT] };
    case SHOWLOGINFRAME:
      return { ...preState, [SHOWLOGINFRAME]: action[SHOWLOGINFRAME] };
    case USERMSG:
      return { ...preState, [USERMSG]: action[USERMSG] };
    default:
      return preState;
  }

}