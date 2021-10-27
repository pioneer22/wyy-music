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

import {
  getPersonalized,
  getNewSet,
  getPlayList,
  getHotSinger,
  getHotAnchor,
} from '@/api/foundMusic'

import './index.scss'

const delPlayList = (playList) => {
  playList.tracks = playList.tracks.slice(0, 10)
  playList.coverImgUrl = playList.coverImgUrl + '?param=80x80'
  return playList
}

class Recommend extends Component {
  state = {
    personalizeds: [],
    newest: [],
    ycLists: [],
    bsLists: [],
    xgLists: [],
    hotSingerLists: [],
    hotAnchorLists: [],
  }

  componentDidMount() {
    getPersonalized().then((res) => {
      if (res.code === 200) {
        let personalizeds = res.result.map((item) => ({
          ...item,
          picUrl: item.picUrl + '?param=140x140',
        }))
        this.setState({
          personalizeds,
        })
      }
    })

    getNewSet().then((res) => {
      if (res.code === 200) {
        let albums = res.albums.map((item, index) => ({
          songName: item.name,
          ...item.artist,
          picUrlSet: item.picUrl + '?param=100x100',
        }))

        albums = albums.reduce((acc, item, index) => {
          if ((index + 1) % 5 === 0)
            return [...acc, albums.slice(index - 4, index + 1)]
          return acc
        }, [])

        this.setState({
          newest: albums,
        })
      }
    })

    // 原创榜
    getPlayList(2884035).then((res) => {
      if (res.code === 200) {
        let ycLists = delPlayList(res.playlist)
        this.setState({ ycLists })
      }
    })

    // 飙升榜
    getPlayList(19723756).then((res) => {
      if (res.code === 200) {
        let bsLists = delPlayList(res.playlist)
        this.setState({ bsLists })
      }
    })

    // 新歌榜
    getPlayList(3779629).then((res) => {
      if (res.code === 200) {
        let xgLists = delPlayList(res.playlist)
        this.setState({ xgLists })
      }
    })

    // 获取热门歌手
    getHotSinger({ limit: 5, offset: 0 }).then((res) => {
      if (res.code === 200) {
        let hotSingerLists = res.artists.map((item) => ({
          ...item,
          picUrl: item.picUrl + '?param=80x80',
        }))
        this.setState({ hotSingerLists })
      }
    })

    // 获取热门主播
    getHotAnchor().then((res) => {
      if (res.code === 200) {
        let hotAnchorLists = res.data.list.map((haObj) => ({
          ...haObj,
          avatarUrl: haObj.avatarUrl + '?param=40x40',
        }))
        this.setState({ hotAnchorLists })
      }
    })
  }

  render() {
    const {
      personalizeds,
      newest,
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
              <Putaway news={newest}></Putaway>
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
