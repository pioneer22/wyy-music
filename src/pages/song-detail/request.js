/* eslint-disable no-useless-escape */
/* eslint-disable import/no-anonymous-default-export */
import { getAlbumDetail, songWords, simiSong, getSongComment, getSongUrl, searchKeywords } from '@/api/global'
import { delDate } from 'utils/utils'

export default {
  reqAlbum: (id) => getAlbumDetail(id).then((res) => {
    if (res.code === 200) {
      return { albumUrl: res.album.picUrl + '?param=132y132' }
    }
  }),

  reqSongWords: (id) => songWords(id).then((res) => {
    if (res.code === 200) {
      let words = res.lrc.lyric
        .replace(/\[(\d|:|\.)*\]/g, '@@')
        .split('@@')
        .slice(1, -1)
      return { words }
    }
  }),

  reqSimiSong: (id) => simiSong(id).then(res => {
    if (res.code === 200) {
      return res.songs;
    }
  }),

  reqComment: (params) => getSongComment(params).then(res => {
    if (res.code === 200) {
      let hotComments = (res.hotComments && res.hotComments.map((item) => ({ ...item, time: delDate(item.time, 1) }))) || []
      let comments = res.comments.map((item) => ({ ...item, time: delDate(item.time, 2) }))
      return {
        comments,
        hotComments,
        total: res.total
      }
    }
  }),

  reqSongUrl: (id) => getSongUrl(id).then(res => {
    if (res.code === 200) {
      return res.data[0]
    }
  }),

  reqSongDetail: (params) => searchKeywords(params).then(res => {
    if (res.code === 200) {
      return res.result.songs[0]
    }
  })
}