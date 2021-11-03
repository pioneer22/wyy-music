import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'

import TopListDetail from './toplist-detail'
import * as topData from './getData'

import { connect } from 'react-redux'
import { saveSelectList } from '@/redux/actions/toplist'

import './index.scss'
class TopList extends Component {
  state = {
    ranks: [],
    selectList: {},
  }

  componentDidMount() {
    topData.topList
      .then((ranks) => {
        this.setState({ ranks })
        this.props.saveSelectList(ranks[0])
        return ranks[0].id
      })
      .then((id) => {
        this.props.history.push(`/home/foundMusic/toplist?id=${id}`)
      })
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
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
                  key={rankObj.id}
                  to={'/home/foundMusic/toplist?id=' + rankObj.id}
                  className="ranking-item flex"
                  onClick={() => this.props.saveSelectList(rankObj)}
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

export default connect((store) => ({ toplist: store.toplist }), {
  saveSelectList,
})(TopList)
