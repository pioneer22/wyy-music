import { SEARCHSELECT, SHOWLOGINFRAME, USERMSG } from '../constant'

export const saveSearchSelect = (searchSelect) => ({ type: SEARCHSELECT, searchSelect });

export const changeShowLoginFrame = (showLoginFrame) => ({ type: SHOWLOGINFRAME, showLoginFrame });

export const changeUserMsg = (userMsg) => ({ type: USERMSG, userMsg });