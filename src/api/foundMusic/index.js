import { request } from '../http'

export const getBanner = () => request({ url: '/banner' }); // 轮播图

export const getPersonalized = (limit = 8) => request({ url: '/personalized', params: { limit } }); // 热门推荐

export const getNewSet = () => request({ url: '/album/newest' }); // 新碟上架

export const getAlbum = (params) => request({ url: '/top/album', params }); // 新碟上架， limit, offset, area, type, year, month

export const getAllAlbum = (params) => request({ url: '/album/new', params }); // 全部新碟： limit, offset, area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本

export const getPlayList = (id = 19723756) => request({ url: '/playlist/detail', params: { id } }) // 获取榜单

export const getHotSinger = (params) => request({ url: '/top/artists', params }) // 获取热门歌手 limit, offset

export const getHotArtist = (type) => request({ url: '/toplist/artist', params: { type } }); //歌手榜  type: 1: 华语 2: 欧美 3: 韩国 4: 日本

export const getHotAnchor = (limit = 5) => request({ url: '/dj/toplist/popular', params: { limit } }); // 获取热门主播

export const getTopList = () => request({ url: '/toplist' }); // 获取排行榜

export const getCatList = () => request({ url: '/playlist/catlist' }); // 获取歌单分类

export const getSongList = (params) => request({ url: '/top/playlist', params }); // 获取歌单 cat, limit, offset

export const getDjCateList = () => request({ url: '/dj/catelist' }); // 电台分类

export const getDjRecommend = (type) => request({ url: '/dj/recommend/type', params: { type } }); // 电台分类推荐： 优秀新电台

export const getDjHotRecommend = (params) => request({ url: '/dj/radio/hot', params }) // 类别热门电台： 电台排行榜 cateId, limit, offset

