import { SELECTLIST, TOPLISTS, PLAYLISTDETAIL } from '../constant';

export const saveSelectList = selectList => ({ type: SELECTLIST, selectList });

export const saveTopLists = topLists => ({ type: TOPLISTS, topLists });

export const savePlayListDetail = playListDetail => ({ type: PLAYLISTDETAIL, playListDetail });