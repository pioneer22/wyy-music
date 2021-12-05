import { request } from '../http'

export const searchSuggest = (params) => request({ url: '/search/suggest', params }); //搜索建议，keywords， type

export const searchKeywords = (params) => request({ url: '/search', params }); //  搜索，keywords,type,limit

export const songWords = (id) => request({ url: '/lyric', params: { id } }); // 获取歌词

export const simiSong = (id) => request({ url: '/simi/song', params: { id } });  // 获取相似歌曲

export const getAlbumDetail = (id) => request({ url: '/album', params: { id } }); // 获取专辑内容

export const getSongUrl = (id) => request({ url: '/song/url', params: { id } }); // 获取音乐 url

export const getSongComment = (params) => request({ url: '/comment/music', params }); // 获取音乐评论 offset, limit

export const getSongDetail = (ids) => request({ url: '/song/detail', params: { ids } }); // 获取歌曲详情

export const toSendCode = (params) => request({ url: '/captcha/sent', params }); // 发送验证码 必填参数 phone

export const toLogin = (params) => request({ url: '/login/cellphone', params }); // 手机登录 必填参数 phone password

export const toRegister = (params) => request({ url: '/register/cellphone', params }); // 注册/修改密码 必填参数 captcha:验证码  phone:手机号码 password:密码 nickname:昵称

export const proofCaptcha = (params) => request({ url: '/captcha/verify', params }); //验证验证码 captcha: 验证码， phone: 手机号码

export const proofPhone = (params) => request({ url: '/cellphone/existence/check', params }); // 检测手机号是否已注册 phone

export const logOut = () => request({ url: '/logout' }); // 退出登录

export const getUserDetail = (uid) => request({ url: '/user/detail', params: { uid } }); // 获取用户详情

export const getPlayList = (uid) => request({ url: '/user/playlist', params: { uid } }); // 获取用户歌单

export const getPlayListDetail = (id) => request({ url: '/playlist/detail', params: { id } }); // 获取歌单详情

export const getAllPlayList = (params) => request({ url: '/playlist/track/all', params }); // 获取歌单所有歌曲 id, limit

export const getAlnumComment = (params) => request({ url: "/comment/album", params }); // 获取专辑评论 id,limit,offset

export const getArtistHotSong = (id) => request({ url: '/artist/top/song', params: { id } }); // 获取歌手热门50首歌曲

export const getArtistAlbum = (params) => request({ url: '/artist/album', params }); // 获取歌手专辑, id,limit,offset

export const getArtistMV = (id) => request({ url: '/artist/mv', params: { id } }); // 获取歌手MV, mv播放地址 /mv?mvid=5461064 获取

export const getArtistDesc = (id) => request({ url: '/artist/desc', params: { id } }); // 获取歌手描述

export const getArtistDetail = (id) => request({ url: '/artist/detail', params: { id } }); //获取歌手详情

export const getSimiArtist = (id) => request({ url: '/simi/artist', params: { id } }); // 获取相似歌手

export const checkMusic = (id) => request({ url: '/check/music', params: { id } }); // 监测歌曲是否有用

// 新建歌单 name, 可选: privacy  10为隐私歌单, type: 歌单类型 默认'NORMAL',传 'VIDEO'则为视频歌单,传 'SHARED'则为共享歌单
export const createMusicList = (params) => request({ url: '/playlist/create', params });

export const deleteMusicList = (id) => request({ url: '/playlist/delete', params: { id } }); // 删除歌单