import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'

import TopListDetail from './toplist-detail'
import * as topData from './getData'

import './index.scss'

export default class TopList extends Component {
  state = {
    ranks: [],
    selectList: {},
  }

  componentDidMount() {
    topData.topList.then((ranks) => {
      this.setState({ ranks })
      topData.playList(ranks[0].id).then((selectList) => {
        this.setState({ selectList })
      })
    })
  }

  render() {
    const { ranks } = this.state
    return (
      <div className="w980 toplist-content">
        <div className="toplist-content-left">
          {ranks.map((rankObj, index) => {
            return (
              <Fragment key={rankObj.id}>
                {index === 0 || index === 4 ? (
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
                ) : (
                  ''
                )}
                <NavLink
                  key={index}
                  to={'/home/foundMusic/toplist?id=' + rankObj.id}
                  className="ranking-item flex"
                  activeClassName="ranking-item-select"
                >
                  <img src={rankObj.coverImgUrl} alt="" />
                  <div>
                    <span>{rankObj.name}</span>
                    <span>{rankObj.updateFrequency}</span>
                  </div>
                </NavLink>
              </Fragment>
            )
          })}
        </div>

        <div className="toplist-content-right">
          <Route
            path="/home/foundMusic/toplist"
            component={TopListDetail}
          ></Route>
        </div>
      </div>
    )
  }
}
