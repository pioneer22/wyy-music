import * as constants from '../constant';
import { Map } from 'immutable';

let initState = Map({
  currentSong: {
    name: '有何不可',
    id: 167876,
    ar: [
      {
        id: 5771,
        name: '许嵩',
      },
    ],
    al: {
      id: 16953,
      name: '自定义',
      picUrl:
        'https://p1.music.126.net/Md3RLH0fe2a_3dMDnfqoQg==/18590542604286213.jpg',
      tns: [],
      pic_str: '18590542604286213',
      pic: 18590542604286212,
    },
    dt: 241840
  }, // 当前播放歌曲
  playList: [], // 播放列表
  lyricList: [], // 歌词列表
  playSequence: 0, // 0循环播放  1随机播放  2单曲循环
  playSongIndex: 0, // 当前歌曲下标
  currentLyricIndex: 0, // 歌词下标
  firstLoad: true, // 首次加载
  isPlay: false, // 播放
})

export default function countReducer (preState = initState, action) {
  // 从action对象中获取type, data等
  const { type } = action;

  // 根据type决定如何加工数据
  switch (type) {
    case constants.PLAYLIST:
      return preState.set(`${constants.PLAYLIST}`, action.playList);
    case constants.CURRENTSONG:
      return preState.set(`${constants.CURRENTSONG}`, action.currentSong);
    case constants.PLAYSEQUENCE:
      return preState.set(`${constants.PLAYSEQUENCE}`, action.playSequence);
    case constants.LYRICLIST:
      return preState.set(`${constants.LYRICLIST}`, action.lyricList);
    case constants.PLAYSONGINDEX:
      return preState.set(`${constants.PLAYSONGINDEX}`, action.playSongIndex);
    case constants.CURRENTLYRICINDEX:
      return preState.set(`${constants.CURRENTLYRICINDEX}`, action.currentLyricIndex);
    case constants.FIRSTLOAD:
      return preState.set(`${constants.FIRSTLOAD}`, action.firstLoad);
    case constants.ISPLAY:
      return preState.set(`${constants.ISPLAY}`, action.isPlay);
    default:
      return preState;
  }
}

