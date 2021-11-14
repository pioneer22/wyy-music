import { SAVESELECTLIST, SAVETOPLISTS, SAVEPLAYLISTDETAIL } from '../constant';

export const saveSelectList = data => ({ type: SAVESELECTLIST, data });

export const saveTopLists = data => ({ type: SAVETOPLISTS, data });

export const savePlayListDetail = data => ({ type: SAVEPLAYLISTDETAIL, data });