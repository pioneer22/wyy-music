import { request } from '../http'

export const searchSuggest = (params) => request({ url: '/search/suggest', params }); //搜索建议，keywords， type

export const songWords = (id) => request({ url: '/lyric', params: { id } }); // 获取歌词

export const simiSong = (id) => request({ url: '/simi/song', params: { id } });  // 获取相似歌曲

export const getAlbum = (id) => request({ url: '/album', params: { id } }); // 获取专辑内容

export const getSongUrl = (id) => request({ url: '/song/url', params: { id } }); // 获取音乐 url

export const getSongComment = (params) => request({ url: '/comment/music', params }); // 获取音乐评论 offset, limit

export const getSongDetail = (ids) => request({ url: '/song/detail', params: { ids } }); // 获取歌曲详情