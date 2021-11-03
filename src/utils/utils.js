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

export const delDate = dateTime => {
  let time = new Date(dateTime)
  return `${time.getMonth() + 1}月${time.getDate()}日`;
}

export const msTurnMins = ms => {
  let minutes = ~~((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (~~((ms % (1000 * 60)) / 1000) + '').padStart(2, 0);
  return `${minutes}:${seconds}`;
}