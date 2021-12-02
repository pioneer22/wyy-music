import { getHotArtist, getArtist } from '@/api/foundMusic'

export const artists = (type = 1) => getHotArtist(type).then(res => {
  if (res.code === 200) {
    return res.list.artists
  }
})

export const artistsType = (params) => getArtist(params).then(res => {
  if (res.code === 200) {
    return res.artists
  }
})