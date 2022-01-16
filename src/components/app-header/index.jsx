/* eslint-disable no-undef */
import React, { memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

import { debounce } from 'lodash'
import { headerLinks, authorUrl } from '@/common/page-data'
import { SearchOutlined } from '@ant-design/icons'
import { searchSuggest, getUserDetail } from '@/api/global'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  changeShowLoginFrame,
  changeUserMsg,
  changeLoginStatus,
  layOut,
} from '@/redux/actions/header'

import { Menu, Dropdown } from 'antd'
import SearchResult from './search-result'
import LoginFrame from 'components/login-frame'

export default memo(function Header(props) {
  const dispatch = useDispatch()
  const [inputVal, setInputValue] = useState('')
  const [searchArr, setSearchArr] = useState([])

  // 判断是否登录
  useEffect(() => {
    if (localStorage.getItem('m_uid')) {
      let id = localStorage.getItem('m_uid')
      getUserDetail(id).then((res) => {
        dispatch(changeUserMsg(res))
        dispatch(changeLoginStatus(true))
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* 渲染头部选项 */
  const selectItem = (linkObj, index) => {
    if (index < 3) {
      return (
        <NavLink
          key={linkObj.name}
          to={linkObj.link}
          className="header-link-item flex-column"
          activeClassName="header-link-active"
        >
          <em>{linkObj.name}</em>
          <i className="icon"></i>
        </NavLink>
      )
    } else {
      return (
        <a
          href={linkObj.link}
          key={linkObj.name}
          className="header-link-item flex-column"
        >
          {linkObj.name}
        </a>
      )
    }
  }

  /* 动态搜索 */
  const searchChange = debounce((keywords) => {
    inputVal &&
      searchSuggest({ keywords }).then((res) => {
        if (res.code === 200) {
          let chnNames = {
            songs: '单曲',
            artists: '歌手',
            albums: '专辑',
            playlists: '歌单',
          }
          let { result } = res
          let searchArr =
            result.order &&
            result.order.map((item) => ({
              key: item,
              name: chnNames[item],
              lists: result[item],
            }))
          setSearchArr(searchArr)
        }
      })
  }, 400)

  const { showLoginFrame, userMsg, isLogin } = useSelector((state) => {
    return {
      showLoginFrame: state.header.showLoginFrame,
      userMsg: state.header.userMsg,
      isLogin: state.header.isLogin,
    }
  }, shallowEqual)
  return (
    <div className="header-container">
      <div className="header-content w1100 flex-between">
        <div className="header-left flex">
          <h1>
            <a href="#/" className="logo sprite_01">
              网易云音乐
            </a>
          </h1>
          <div className="link-container flex-column">
            {headerLinks.map((linkObj, index) => selectItem(linkObj, index))}
          </div>
        </div>

        <div className="header-right flex-column">
          <div className="search-container flex-column">
            <span>
              <SearchOutlined />
            </span>
            <input
              placeholder="音乐/视频/电台/用户"
              value={inputVal}
              onChange={(e) => searchChange(e.target.value)}
              onInput={(e) => setInputValue(e.target.value)}
            />

            {inputVal.length > 0 && (
              <div className="search-result-box">
                <SearchResult
                  searchVal={inputVal}
                  songs={searchArr}
                  toSearchDetail={() => setInputValue('')}
                />
              </div>
            )}
          </div>

          <a href={authorUrl} className="author-center">
            创作者中心
          </a>

          {isLogin ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="user">
                    <NavLink to={`/user?id=${userMsg.profile.userId}`}>
                      我的主页
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <div
                      onClick={() => {
                        dispatch(layOut())
                      }}
                    >
                      退出
                    </div>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomCenter"
              arrow
            >
              <img
                src={userMsg.profile.avatarUrl + '?param=30x30'}
                alt=""
                className="avatar-url"
              />
            </Dropdown>
          ) : (
            <span
              className="login-btn text-line"
              onClick={() => {
                dispatch(changeShowLoginFrame(true))
              }}
            >
              登录
            </span>
          )}
        </div>
      </div>
      <div className="red-line"></div>
      <div style={{ display: showLoginFrame ? 'block' : 'none' }}>
        <LoginFrame />
      </div>
    </div>
  )
})
