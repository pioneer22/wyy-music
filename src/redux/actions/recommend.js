import { SAVEPERSONALIZED } from "../constant";

// 同步action，就是指action的值为Object类型的一般对象
export const savePersonalized = (data) => ({ type: SAVEPERSONALIZED, data });