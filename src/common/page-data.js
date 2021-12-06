export const headerLinks = [
  { name: '发现音乐', link: '/foundMusic' },
  { name: '我的音乐', link: '/myMusic' },
  { name: '朋友', link: '/friends' },
  { name: '商城', link: 'https://music.163.com/store/product' },
  { name: '音乐人', link: 'https://music.163.com/st/musician' },
  { name: '下载客户端', link: 'https://music.163.com/#/download' }
]

/* 创作者中心 */
export const authorUrl = "https://github.com/pioneer22/wyy-music/tree/master"

/* 下载地址 */
export const downloadUrl = "https://d1.music.126.net/dmusic/cloudmusicsetup2.9.5.199424.exe"

/* 发现音乐选项 */
export const foundLinks = [
  { name: '推荐', link: '/foundMusic/recommend' },
  { name: '排行榜', link: '/foundMusic/toplist' },
  { name: '歌单', link: '/foundMusic/playlist' },
  { name: '主播电台', link: '/foundMusic/djradio' },
  { name: '歌手', link: '/foundMusic/artist' },
  { name: '新碟上架', link: '/foundMusic/album' },
]

/* 热门推荐选项 */
export const hotRecommend = [
  { name: '华语', link: '' },
  { name: '流行', link: '' },
  { name: '摇滚', link: '' },
  { name: '民谣', link: '' },
  { name: '电子', link: '' },
]

/* 新碟地址 */
export const albumArea = [{
  name: '全部', type: 'ALL'
}, {
  name: '华语', type: 'ZH'
}, {
  name: '欧美', type: 'EA'
}, {
  name: '韩国', type: 'KR'
}, {
  name: '日本', type: 'JP'
}]

/* 歌手榜 */
export const artist = [{
  name: '华语', type: 1
}, {
  name: '欧美', type: 2
}, {
  name: '韩国', type: 3
}, {
  name: '日本', type: 4
}]

// 歌手分类
export const artists = [
  { name: '华语', area: 7 },
  { name: '欧美', area: 96 },
  { name: '日本', area: 8 },
  { name: '韩国', area: 16 },
  { name: '其他', area: 0 }
]

// 底部链接
export const musicLinks = [
  { name: '服务条款', link: 'https://st.music.163.com/official-terms/service' },
  { name: '隐私政策', link: 'https://st.music.163.com/official-terms/privacy' },
  { name: '儿童隐私政策', link: 'https://st.music.163.com/official-terms/children' },
  { name: '版权投诉指引', link: 'https://music.163.com/st/staticdeal/complaints.html' },
  { name: '意见反馈', link: '/foundMusic' },
  { name: '广告合作', link: '/foundMusic' }
]

export const footerIcons = [
  { name: '用户认证', link: 'https://music.163.com/st/userbasic#/auth' },
  { name: '独立音乐人', link: 'https://music.163.com/st/musician' },
  { name: '赞赏', link: 'https://music.163.com/web/reward' },
  { name: '视频奖励', link: 'https://music.163.com/#/login?targetUrl=https%3A%2F%2Fmusic.163.com%2Fuservideo%23%2Fplan' }
]

// 默认音乐id
export const SONG_PLAYLIST_ID = [1815389717, 1404511131, 26305547, 1463165983, 209760];

// 默认音乐
export const DEFAULT_SONG = {
  name: '有何不可',
  id: 167876,
  ar: [
    {
      id: 5771,
      name: '许嵩',
      tns: [],
      alias: [],
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
}

// 登录
export const loginPosition = [
  {
    style: { 'backgroundPosition': '-150px -670px' },
    title: '微信登录'
  },
  {
    style: { 'backgroundPosition': '-190px -670px' },
    title: 'QQ登录'
  },
  {
    style: { 'backgroundPosition': '-231px -670px' },
    title: '微博登录'
  },
  {
    style: { 'backgroundPosition': '-271px -670px' },
    title: '网易邮箱登录'
  }
];

// 专辑大小
export const albumSize = {
  '1': {
    width: '118px',
    height: '100px',
    backgroundPosition: '0 -570px'
  },
  '2': {
    width: '146px',
    height: '120px',
    backgroundPosition: '-171px -849px'
  },
  '3': {
    width: '153px',
    height: '130px',
    backgroundPosition: '0 -846px'
  },
  '4': {
    width: '209px',
    height: '177px',
    backgroundPosition: '0 -986px'
  }
}

// 常用正则
export const usualReg = {
  phoneReg: /^1[3-9]\d{9}$/,
  pwdReg: /[\w-]{6,18}/
}