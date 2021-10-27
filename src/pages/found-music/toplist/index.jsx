import React, { Component, Fragment } from 'react'

import { getTopList } from '@/api/foundMusic'

import './index.scss'

export default class TopList extends Component {
  state = {
    ranks: [],
  }

  componentDidMount() {
    getTopList().then((res) => {
      if (res.code === 200) {
        let ranks = res.list.map((item) => ({
          ...item,
          coverImgUrl: item.coverImgUrl + '?param=40x40',
        }))
        this.setState({ ranks })
      }
    })
  }

  render() {
    const { ranks } = this.state
    return (
      <div className="w980 toplist-content">
        <div className="toplist-content-left">
          {ranks.map((rankObj, index) => {
            return (
              <Fragment>
                <h3
                  className="ranking-title"
                  style={{ marginTop: index === 4 ? '17px' : '' }}
                >
                  {index === 0
                    ? '云音乐特色榜'
                    : index === 4
                    ? '全球媒体榜'
                    : ''}
                </h3>

                <div className="ranking-item flex">
                  <img src={rankObj.coverImgUrl} alt="" />
                  <div>
                    <span>{rankObj.name}</span>
                    <span>{rankObj.updateFrequency}</span>
                  </div>
                </div>
              </Fragment>
            )
          })}
        </div>

        <div className="toplist-content-right"></div>
      </div>
    )
  }
}
