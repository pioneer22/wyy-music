import React, { Component, Fragment } from 'react'

import qs from 'querystring'

import TopListDetail from './toplist-detail'
import * as topData from './request'

import { connect } from 'react-redux'
import {
  saveSelectList,
  saveTopLists,
  savePlayListDetail,
} from '@/redux/actions/toplist'

import './index.scss'
class TopList extends Component {
  state = {
    ranks: [],
    selectList: {},
  }

  componentDidMount() {
    const { search } = this.props.location
    const { id } = qs.parse(search.slice(1))

    let topLists = this.props.toplist.topLists
    if (topLists) {
      this.setState({ ranks: topLists })
      let topId = id || topLists[0].id
      topData.playList(topId).then((playlistObj) => {
        this.props.savePlayListDetail(playlistObj)
      })
    } else {
      topData.topList().then((ranks) => {
        this.setState({ ranks })
        this.props.saveSelectList(ranks[0])
        this.props.saveTopLists(ranks)
        topData.playList(ranks[0].id).then((playlistObj) => {
          this.props.savePlayListDetail(playlistObj)
        })
      })
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  selectList(rankObj) {
    this.props.saveSelectList(rankObj)
    topData.playList(rankObj.id).then((playlistObj) => {
      this.props.savePlayListDetail(playlistObj)
    })
    this.props.history.push(`/home/foundMusic/toplist?id=${rankObj.id}`)
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
                <div
                  key={rankObj.id}
                  className="ranking-item flex"
                  onClick={() => this.selectList(rankObj)}
                >
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

        <div className="toplist-content-right">
          <TopListDetail />
        </div>
      </div>
    )
  }
}

export default connect((store) => ({ toplist: store.toplist }), {
  saveSelectList,
  saveTopLists,
  savePlayListDetail,
})(TopList)
