import {
  getPersonalized,
  getNewSet,
  getPlayList,
  getHotSinger,
  getHotAnchor,
} from '@/api/foundMusic';

const delPlayList = (playList) => {
  playList.tracks = playList.tracks.slice(0, 10)
  playList.coverImgUrl = playList.coverImgUrl + '?param=80x80'
  return playList
}

// 热门推荐
export const personalized = getPersonalized().then((res) => {
  if (res.code === 200) {
    return res.result.map((item) => ({
      ...item,
      picUrl: item.picUrl + '?param=140x140',
    }))
  }
  return [];
});

// 新碟上架
export const newSet = getNewSet().then((res) => {
  if (res.code === 200) {
    let albums = res.albums.map(item => ({
      songName: item.name,
      ...item.artist,
      picUrlSet: item.picUrl + '?param=100x100',
    }))
    return albums.reduce((acc, item, index) => {
      if ((index + 1) % 5 === 0)
        return [...acc, albums.slice(index - 4, index + 1)]
      return acc
    }, []);
  }
})

// 原创榜 / 飙升榜 / 新歌榜
export const allLists = (id) => getPlayList(id).then((res) => {
  if (res.code === 200) {
    return delPlayList(res.playlist)
  }
  return {}
})

// 获取热门歌手
export const hotSinger = getHotSinger({ limit: 5, offset: 0 }).then((res) => {
  if (res.code === 200) {
    return res.artists.map((item) => ({
      ...item,
      picUrl: item.img1v1Url + '?param=80x80',
    }))
  }
  return []
})

// 获取热门主播
export const hotAnchor = getHotAnchor().then((res) => {
  if (res.code === 200) {
    return res.data.list.map((haObj) => ({
      ...haObj,
      avatarUrl: haObj.avatarUrl + '?param=40x40',
    }))
  }
  return []
})