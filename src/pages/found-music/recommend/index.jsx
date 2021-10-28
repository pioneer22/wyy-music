/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

import Banner from 'components/app-main/banner'
import TitleBar from 'components/title-bar'
import MusicModule from 'components/music-module'
import Putaway from 'components/app-main/putaway'
import MusicList from 'components/app-main/music-list'
import NoLogin from 'components/app-main/no-login'
import InSinger from 'components/app-main/in-singer'
import HotAnchor from 'components/app-main/hot-anchor'

import { RightOutlined } from '@ant-design/icons'

import { hotRecommend } from '@/common/page-data'

import { connect } from 'react-redux'
import {} from '@/redux/actions/recommend'

import * as recData from './getData'

import './index.scss'

class Recommend extends Component {
  state = {
    personalizeds: [],
    newset: [],
    ycLists: [],
    bsLists: [],
    xgLists: [],
    hotSingerLists: [],
    hotAnchorLists: [],
  }

  componentDidMount() {
    recData.personalized.then((personalizeds) => {
      this.setState({ personalizeds })
    })

    recData.newSet.then((newset) => {
      this.setState({ newset })
    })

    recData.allLists(2884035).then((ycLists) => {
      this.setState({ ycLists })
    })

    recData.allLists(19723756).then((bsLists) => {
      this.setState({ bsLists })
    })

    recData.allLists(3779629).then((xgLists) => {
      this.setState({ xgLists })
    })

    recData.hotSinger.then((hotSingerLists) => {
      this.setState({ hotSingerLists })
    })

    recData.hotAnchor.then((hotAnchorLists) => {
      this.setState({ hotAnchorLists })
    })
  }

  render() {
    const {
      personalizeds,
      newset,
      ycLists,
      bsLists,
      xgLists,
      hotSingerLists,
      hotAnchorLists,
    } = this.state

    return (
      <>
        <Banner />
        <div className="recommend-content w980">
          <div className="recommend-content-left">
            <TitleBar
              titleObj={{ name: '热门推荐', link: '' }}
              links={hotRecommend}
            ></TitleBar>
            <div className="hot-content common-content flex-column">
              {personalizeds.map((perObj) => {
                return <MusicModule {...perObj} key={perObj.id}></MusicModule>
              })}
            </div>

            <TitleBar titleObj={{ name: '新碟上架', link: '' }}></TitleBar>
            <div className="new-content common-content">
              <Putaway news={newset}></Putaway>
            </div>

            <TitleBar titleObj={{ name: '榜单', link: '' }}></TitleBar>
            <div className="sort-content">
              <MusicList {...ycLists} key="ycLists"></MusicList>
              <MusicList {...bsLists} key="bsLists"></MusicList>
              <MusicList {...xgLists} key="xgLists"></MusicList>
            </div>
          </div>
          <div className="recommend-content-right">
            <NoLogin></NoLogin>

            <div className="singer-box">
              <div className="in-singer flex-between">
                <span>入驻歌手</span>
                <a href="#">
                  查看全部
                  <RightOutlined style={{ fontSize: '12px' }} />
                </a>
              </div>
              <>
                {hotSingerLists &&
                  hotSingerLists.map((hsObj) => {
                    return <InSinger {...hsObj} key={hsObj.id}></InSinger>
                  })}
              </>
              <div className="be-singer-btn">申请成为网易音乐人</div>
            </div>

            <div className="singer-box">
              <div className="in-singer">
                <span>热门主播</span>
              </div>
              <>
                {hotAnchorLists &&
                  hotAnchorLists.map((haObj) => {
                    return <HotAnchor {...haObj} key={haObj.id}></HotAnchor>
                  })}
              </>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default connect(
  (store) => ({ recommend: store.recommend }),
  {}
)(Recommend)
