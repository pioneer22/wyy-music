/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

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
import {
  savePersonalized,
  saveNewSet,
  savePlayList,
  saveHotSinger,
  saveHotAnchor,
} from '@/redux/actions/recommend'

import * as recData from './request'

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
      this.props.savePersonalized(personalizeds)
      this.setState({ personalizeds })
    })

    recData.newSet.then((newset) => {
      this.props.saveNewSet(newset)
      this.setState({ newset })
    })

    Promise.all([
      recData.allLists(2884035),
      recData.allLists(19723756),
      recData.allLists(3779629),
    ]).then((res) => {
      this.setState({ ycLists: res[0], bsLists: res[1], xgLists: res[2] })
      this.props.savePlayList({
        ycLists: res[0],
        bsLists: res[1],
        xgLists: res[2],
      })
    })

    recData.hotSinger.then((hotSingerLists) => {
      this.props.saveHotSinger(hotSingerLists)
      this.setState({ hotSingerLists })
    })

    recData.hotAnchor.then((hotAnchorLists) => {
      this.props.saveHotAnchor(hotAnchorLists)
      this.setState({ hotAnchorLists })
    })
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
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
              hasIcon="true"
              titleObj={{ name: '热门推荐' }}
              centerSlot={hotRecommend.map((item) => {
                return (
                  <NavLink
                    to={`/foundMusic/playlist?cat=${item.name}`}
                    key={item.name}
                    className="link-active"
                  >
                    {item.name}
                  </NavLink>
                )
              })}
              rightSlot={
                <div>
                  更多<i className="more-icon"></i>
                </div>
              }
            ></TitleBar>
            <div className="hot-content common-content flex-column">
              {personalizeds.map((perObj) => {
                return <MusicModule {...perObj} key={perObj.id}></MusicModule>
              })}
            </div>

            <TitleBar
              hasIcon="true"
              titleObj={{ name: '新碟上架' }}
              rightSlot={
                <div>
                  更多<i className="more-icon"></i>
                </div>
              }
            ></TitleBar>
            <div className="new-content common-content">
              <Putaway news={newset}></Putaway>
            </div>

            <TitleBar
              hasIcon="true"
              titleObj={{ name: '榜单' }}
              rightSlot={
                <div>
                  更多<i className="more-icon"></i>
                </div>
              }
            ></TitleBar>
            <div className="sort-content">
              {[ycLists, bsLists, xgLists].map((item, index) => {
                return <MusicList {...item} key={'list' + index}></MusicList>
              })}
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
              {hotSingerLists &&
                hotSingerLists.map((hsObj) => {
                  return <InSinger {...hsObj} key={hsObj.id}></InSinger>
                })}
              <div className="be-singer-btn">申请成为网易音乐人</div>
            </div>

            <div className="singer-box">
              <div className="in-singer">
                <span>热门主播</span>
              </div>
              {hotAnchorLists &&
                hotAnchorLists.map((haObj) => {
                  return <HotAnchor {...haObj} key={haObj.id}></HotAnchor>
                })}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default connect((store) => ({ recommend: store.recommend }), {
  savePersonalized,
  saveNewSet,
  savePlayList,
  saveHotSinger,
  saveHotAnchor,
})(Recommend)
