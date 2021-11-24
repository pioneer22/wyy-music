import * as constants from '../constant'
import * as global from '@/api/global'
import { lyricsSplit } from 'utils/utils'

// 保存歌曲
export const saveCurrentSong = (currentSong, playSongIndex) => {
  return (dispatch) => {
    dispatch({ type: constants.CURRENTSONG, currentSong })
    dispatch({ type: constants.PLAYSONGINDEX, playSongIndex })
  }
}

// 添加歌曲到播放列表
export const savePlayList = (playIds) => {
  return (dispatch, getState) => {
    let playLists = getState().playerBar.get(constants.PLAYLIST);
    let playIdsList = playLists.length > 0 ? playLists.map(songObj => songObj.id) : [];
    let newIds = playIds;
    // 过滤已存在歌曲
    if (Array.isArray(playIds)) {
      let newArr = playIds.filter(id => !playIdsList.includes(id));
      if (newArr.length > 0)
        newIds = newArr.join(',');
      else
        return;
    } else {
      if (playIdsList.includes(playIds)) return;
    }

    // 获取歌曲
    global.getSongDetail(newIds).then(res => {
      if (res.code === 200) {
        // dispatch({ type: constants.PLAYLIST, playList: [...playLists, ...res.songs] });
        res.songs.forEach(song => {
          global.songWords(song.id).then(res => {
            if (res.code === 200) {
              let lyricList = getState().playerBar.get(constants.LYRICLIST);
              playLists = getState().playerBar.get(constants.PLAYLIST);
              dispatch({ type: constants.PLAYLIST, playList: [...playLists, song] });
              dispatch({ type: constants.LYRICLIST, lyricList: [...lyricList, { id: song.id, words: lyricsSplit(res.lrc.lyric) }] });
            }
          })
        })
        if (getState().playerBar.get(constants.FIRSTLOAD)) {
          dispatch({ type: constants.CURRENTSONG, currentSong: res.songs[0] });
          dispatch({ type: constants.FIRSTLOAD, firstLoad: false });
        }
      }
    })
  }
};

// 删除播放列表
export const delPlayList = (playIdsList) => {
  return (dispatch, getState) => {
    playIdsList = Array.isArray(playIdsList) ? playIdsList : [playIdsList];
    let playLists = getState().playerBar.get(constants.PLAYLIST);
    let lyricList = getState().playerBar.get(constants.LYRICLIST);
    let newPlayLists = playLists.filter(item => !playIdsList.includes(item.id));
    let newLyricLists = lyricList.filter(item => !playIdsList.includes(item.id));
    dispatch({ type: constants.PLAYLIST, playList: newPlayLists });
    dispatch({ type: constants.LYRICLIST, lyricList: newLyricLists });
  }
}

// 保存播放方式下标更改
export const savePlaySequence = (playSequence) => ({ type: constants.PLAYSEQUENCE, playSequence });

// 播放列表歌词列表
export const changeLyricList = (lyricList) => ({ type: constants.LYRICLIST, lyricList });

// 修改歌词下标
export const changeCurrentLyricIndex = (currentLyricIndex) => ({ type: constants.CURRENTLYRICINDEX, currentLyricIndex });