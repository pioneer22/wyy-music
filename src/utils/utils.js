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