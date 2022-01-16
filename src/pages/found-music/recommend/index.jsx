/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, memo } from 'react'
import { NavLink } from 'react-router-dom'

import Banner from 'components/app-main/banner'
import TitleBar from 'components/title-bar'
import MusicModule from 'components/music-module'
import Putaway from 'components/app-main/putaway'
import MusicList from 'components/app-main/music-list'
import NoLogin from 'components/app-main/no-login'
import InSinger from 'components/app-main/in-singer'
import HotAnchor from 'components/app-main/hot-anchor'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { RightOutlined } from '@ant-design/icons'
import { hotRecommend, headerLinks } from '@/common/page-data'
import {
  savePersonalized,
  saveNewSet,
  saveList,
  saveHotSinger,
  saveHotAnchor,
} from '@/redux/actions/recommend'

import * as recData from './request'
import './index.scss'

export default memo(function Recommend(props) {
  const [personalizeds, setPersonalizeds] = useState([])
  const [newset, setNewSet] = useState([])
  const [phLists, setPhLists] = useState([])
  const [hotSingerLists, setHotSingerLists] = useState([])
  const [hotAnchorLists, setHotAnchorLists] = useState([])
  const dispatch = useDispatch()
  const { isLogin } = useSelector(
    (state) => ({
      isLogin: state.header.isLogin,
    }),
    shallowEqual
  )

  useEffect(() => {
    recData.personalized.then((personalizeds) => {
      setPersonalizeds(personalizeds)
      dispatch(savePersonalized(personalizeds))
    })

    recData.newSet.then((newset) => {
      setNewSet(newset)
      dispatch(saveNewSet(newset))
    })

    Promise.all([
      recData.allLists(2884035),
      recData.allLists(19723756),
      recData.allLists(3779629),
    ]).then((res) => {
      setPhLists(res)
      dispatch(
        saveList({
          ycLists: res[0],
          bsLists: res[1],
          xgLists: res[2],
        })
      )
    })

    recData.hotSinger.then((hotSingerLists) => {
      setHotSingerLists(hotSingerLists)
      dispatch(saveHotSinger(hotSingerLists))
    })

    recData.hotAnchor.then((hotAnchorLists) => {
      setHotAnchorLists(hotAnchorLists)
      dispatch(saveHotAnchor(hotAnchorLists))
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
              return (
                <NavLink key={perObj.id} to={`/playlist?id=${perObj.id}`}>
                  <MusicModule {...perObj}></MusicModule>
                </NavLink>
              )
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
            {phLists.map((item, index) => {
              return <MusicList {...item} key={'list' + index}></MusicList>
            })}
          </div>
        </div>
        <div className="recommend-content-right">
          {isLogin ? '' : <NoLogin></NoLogin>}

          <div className="singer-box">
            <div className="in-singer flex-between">
              <span>入驻歌手</span>
              <NavLink to="/foundMusic/artist">
                查看全部
                <RightOutlined style={{ fontSize: '12px' }} />
              </NavLink>
            </div>
            {hotSingerLists &&
              hotSingerLists.map((hsObj) => {
                return (
                  <NavLink to={`/artists?id=${hsObj.id}`} key={hsObj.id}>
                    <InSinger {...hsObj}></InSinger>
                  </NavLink>
                )
              })}
            <div
              className="be-singer-btn"
              onClick={() => {
                window.open(headerLinks[4].link)
              }}
            >
              申请成为网易音乐人
            </div>
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
})
