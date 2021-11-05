import { request } from '../http'

export const getBanner = () => request({ url: '/banner' }); // 轮播图

export const getPersonalized = (limit = 8) => request({ url: '/personalized', params: { limit } }); // 热门推荐

export const getNewSet = () => request({ url: '/album/newest' }); // 新碟上架

export const getPlayList = (id = 19723756) => request({ url: '/playlist/detail', params: { id } }) // 获取榜单

export const getHotSinger = ({ limit, offset }) => request({ url: '/top/artists', params: { limit, offset } }) // 获取热门歌手

export const getHotAnchor = (limit = 5) => request({ url: '/dj/toplist/popular', params: { limit } }); // 获取热门主播

export const getTopList = () => request({ url: '/toplist' }); // 获取排行榜

export const getCatList = () => request({ url: '/playlist/catlist' }); // 获取歌单分类

export const getSongList = ({ cat, limit, offset }) => request({ url: '/playlist/catlist', params: { cat, limit, offset } }); // 获取歌单