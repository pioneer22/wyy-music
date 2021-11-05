import {
  getCatList,
  getSongList
} from '@/api/foundMusic';

export const catList = getCatList().then(res => {
  if (res.code === 200) {
    let arrays = new Array(5).fill([]);
    let styles = [
      '-20px -735px',
      '0px -60px',
      '0px -88px',
      '0px -117px',
      '0px -141px'];

    res.sub.forEach((item) => {
      arrays[item.category] = [...arrays[item.category], item.name]
    })

    return arrays.map((item, index) => ({
      typeLists: item,
      style: { 'backgroundPosition': styles[index] },
      direction: res.categories[index]
    }))
  }
  return []
});

export const songTypeList = (params) => getSongList(params).then(res => {
  console.log(res)
  return res.playlists.map(lists => ({ ...lists, picUrl: lists.coverImgUrl + '?param=140x140' }));
})