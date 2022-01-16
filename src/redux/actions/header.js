import { SEARCHSELECT, SHOWLOGINFRAME, USERMSG, MUSICLIST, ISLOGIN } from '../constant'
import { logOut } from '@/api/global'

export const saveSearchSelect = (searchSelect) => ({ type: SEARCHSELECT, searchSelect });

export const changeShowLoginFrame = (showLoginFrame) => ({ type: SHOWLOGINFRAME, showLoginFrame });

export const changeUserMsg = (userMsg) => ({ type: USERMSG, userMsg });

export const changeMusicList = (musicList) => ({ type: MUSICLIST, musicList });

export const changeLoginStatus = (isLogin) => {
  return (dispatch) => {
    dispatch({ type: ISLOGIN, isLogin: isLogin })
  }
}; // 是否登录

export const layOut = () => {
  return (dispatch) => {
    logOut().then((res) => {
      if (res.code === 200) {
        localStorage.removeItem('m_uid')
        dispatch({ type: ISLOGIN, isLogin: false });
        dispatch({ type: USERMSG, userMsg: {} });
      }
    })
  }
}// 退出登录