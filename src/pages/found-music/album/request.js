import { getAllAlbum } from '@/api/foundMusic'

export const allAlbum = (params) => getAllAlbum(params).then((res) => {
  if (res.code === 200) {
    return {
      allAlbums: res.albums,
      total: res.total
    }
  }
})