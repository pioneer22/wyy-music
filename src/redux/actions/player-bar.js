import * as constants from '../constant'
import * as global from '@/api/global'
import { lyricsSplit } from 'utils/utils'
import { message } from 'antd'

// 保存歌曲
export const saveCurrentSong = (currentSong, playSongIndex) => {
  return (dispatch, getState) => {
    dispatch({ type: constants.CURRENTSONG, currentSong })
    dispatch({ type: constants.PLAYSONGINDEX, playSongIndex })
    if (!getState().playerBar.get(constants.FIRSTLOAD)) {
      dispatch(changePlayStatus(true))
    }
  }
}

// 添加歌曲到播放列表
export const savePlayList = (playIds, isPlay = false) => {
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
      if (playIdsList.includes(playIds) && isPlay) {
        // 列表存在歌曲，立即播放
        let index = playIdsList.indexOf(playIds)
        dispatch(saveCurrentSong(playLists[index], index))
        return;
      }
      if (playIdsList.includes(playIds)) {
        message.warn('播放列表已存在歌曲~')
        return;
      } else {
        message.success('已添加歌曲~')
      }
    }

    // 获取歌曲
    global.getSongDetail(newIds).then(res => {
      if (res.code === 200) {
        res.songs.forEach(song => {
          global.songWords(song.id).then(res => {
            if (res.code === 200) {
              let lyricList = getState().playerBar.get(constants.LYRICLIST);
              playLists = getState().playerBar.get(constants.PLAYLIST);
              dispatch({ type: constants.PLAYLIST, playList: isPlay ? [song, ...playLists] : [...playLists, song] });
              dispatch({ type: constants.LYRICLIST, lyricList: isPlay ? [{ id: song.id, words: lyricsSplit(res.lrc.lyric) }, ...lyricList] : [...lyricList, { id: song.id, words: lyricsSplit(res.lrc.lyric) }] });
            }
          })
        })

        if (isPlay) {
          dispatch(saveCurrentSong(res.songs[0], 0))
        }

        // 首次加载
        if (getState().playerBar.get(constants.FIRSTLOAD)) {
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

// 切换播放状态
export const changePlayStatus = (isPlay) => ({ type: constants.ISPLAY, isPlay });