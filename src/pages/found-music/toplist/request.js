import { getTopList, getPlayList } from '@/api/foundMusic'
import { delDate } from 'utils/utils'

export const topList = () => getTopList().then((res) => {
  if (res.code === 200) {
    return res.list.map((item) => ({
      ...item,
      coverImgUrl: item.coverImgUrl + '?param=40x40',
    }))
  }
})

export const playList = (id) => getPlayList(id).then((res) => {
  if (res.code === 200) {
    const { playlist } = res
    return {
      ...playlist,
      coverImgUrl: playlist.coverImgUrl + '?param=150x150',
      updateTime: delDate(playlist.updateTime)
    }
  }
})