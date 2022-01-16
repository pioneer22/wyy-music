import { SEARCHSELECT, SHOWLOGINFRAME, USERMSG, MUSICLIST, ISLOGIN } from "../constant";

const initState = {
  searchSelect: {},
  showLoginFrame: false,
  userMsg: {},
  musicList: [],
  isLogin: false
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
    case MUSICLIST:
      return { ...preState, [MUSICLIST]: action[MUSICLIST] };
    case ISLOGIN:
      return { ...preState, [ISLOGIN]: action[ISLOGIN] };
    default:
      return preState;
  }

}