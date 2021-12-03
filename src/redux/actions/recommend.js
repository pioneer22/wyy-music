import { BANNER, PERSONALIZED, NEWSET, LIST, HOTSINGER, HOTANCHOR } from "../constant";

// 同步action，就是指action的值为Object类型的一般对象
export const saveBanner = (banner) => ({ type: BANNER, banner });

export const savePersonalized = (personalized) => ({ type: PERSONALIZED, personalized });

export const saveNewSet = newSet => ({ type: NEWSET, newSet });

export const saveList = list => ({ type: LIST, list });

export const saveHotSinger = hotSinger => ({ type: HOTSINGER, hotSinger });

export const saveHotAnchor = hotAnchor => ({ type: HOTANCHOR, hotAnchor });