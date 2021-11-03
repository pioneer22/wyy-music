import { SAVEPERSONALIZED, SAVENEWSET, SAVEPLAYLIST, SAVEHOTSINGER, SAVEHOTANCHER } from "../constant";

// 同步action，就是指action的值为Object类型的一般对象
export const savePersonalized = (data) => ({ type: SAVEPERSONALIZED, data });

export const saveNewSet = data => ({ type: SAVENEWSET, data });

export const savePlayList = data => ({ type: SAVEPLAYLIST, data });

export const saveHotSinger = data => ({ type: SAVEHOTSINGER, data });

export const saveHotAnchor = data => ({ type: SAVEHOTANCHER, data });