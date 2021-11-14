import { getDjCateList, getDjRecommend, getDjHotRecommend } from '@/api/foundMusic'

export const djCateList = () => getDjCateList().then((res) => {
  if (res.code === 200) {
    return res.categories
  }
})

export const djRecommend = (type) => getDjRecommend(type).then(res => {
  if (res.code === 200) {
    return res.djRadios.slice(0, 5).map(item => ({ ...item, imgUrl: item.picUrl + '?param=150x150' }))
  }
})

export const djHotRecommend = (params) => getDjHotRecommend(params).then(res => {
  if (res.code === 200) {
    return {
      total: res.count,
      hotRecommends: res.djRadios.map((item) => ({ ...item, imgUrl: item.picUrl + '?param=120x120' }))
    }
  }
})