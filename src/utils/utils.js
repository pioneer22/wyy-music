/* eslint-disable default-case */
export const delNum = (num) => {
  num = +num;
  let newNum = '';
  if (num > 100000000) {
    newNum = (num / 100000000).toFixed(1) + '亿'
  } else if (num > num / 10000) {
    newNum = (num / 10000).toFixed(1) + '万'
  }
  return newNum;
}

/* 时间戳转时间 */
export const delDate = (dateTime, type = 0) => {
  let time = new Date(dateTime)
  switch (type) {
    case 0:
      return `${time.getMonth() + 1}月${time.getDate()}日`;
    case 1:
      return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`;
    case 2:
      return `${time.getMonth() + 1}月${time.getDate()}日 ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    default:
      return time;
  }
}

/* 毫秒转时间 */
export const msTurnMins = ms => {
  let minutes = ~~((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (~~((ms % (1000 * 60)) / 1000) + '').padStart(2, 0);
  return `${minutes}:${seconds}`;
}

/* 获取随机数 */
export const getRandomNum = (end, start = 0) => {
  if (end < start) return;
  return Math.floor(Math.random() * (end - start)) + start;
}

/* 获取歌曲url */
export const getPlayUrl = (id) => `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

/* 歌词切割 */
const lyricsExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export const lyricsSplit = (lyrics) => {
  if (!lyrics) return;
  const lineString = lyrics.split('\n');
  let lyricsLists = [];
  for (let line of lineString) {
    if (line) {
      const result = lyricsExp.exec(line)
      if (!result) continue
      const time1 = result[1] * 60 * 1000
      const time2 = result[2] * 1000
      const time3 = result[3].length > 2 ? result[3] * 1 : result[3] * 10;
      // 当前歌曲播放的总时长(毫秒)
      const currentTotalTime = time1 + time2 + time3
      const content = line.replace(lyricsExp, '').trim()
      const lineObj = { currentTotalTime, content };
      lyricsLists.push(lineObj)
    }
  }
  return lyricsLists;
}

/**
 * 歌词滚动
 * @param {Element} element 元素
 * @param {} to 
 * @param {Number} duration 总时长
 *  */
export const scrollTo = (elem, to, duration) => {
  if (duration < 0) return;
  // 目标-当前距离的卷曲的top
  var difference = to - elem.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function () {
    elem.scrollTop = elem.scrollTop + perTick;
    if (elem.scrollTop >= to) return;
    scrollTo(elem, to, duration - 10);
  }, 10);
}