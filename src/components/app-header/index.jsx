/* eslint-disable no-undef */
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

import { debounce } from 'lodash'
import { headerLinks, authorUrl } from '@/common/page-data'
import { SearchOutlined } from '@ant-design/icons'
import { searchSuggest, logOut, getUserDetail } from '@/api/global'
import { connect } from 'react-redux'
import { changeShowLoginFrame, changeUserMsg } from '@/redux/actions/header'
import { withRouter } from 'react-router'

import { Menu, Dropdown } from 'antd'
import SearchResult from './search-result'
import LoginFrame from 'components/login-frame'

class Header extends Component {
  constructor(props) {
    super(props)
    this.callAjax = debounce(this.callAjax, 400)
    this.callAjax.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('m_uid')) {
      let id = localStorage.getItem('m_uid')
      getUserDetail(id).then((res) => {
        if (res.code === 200) {
          this.props.changeUserMsg(res)
        }
      })
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  state = {
    inputVal: '',
    searchArr: [],
  }

  /* 渲染头部选项 */
  selectItem = (linkObj, index) => {
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
  searchChange(e) {
    this.callAjax(e.target.value)
    this.setState({
      inputVal: e.target.value,
    })
  }

  /* 关闭搜索面板 */
  toSearchDetail() {
    this.setState({ inputVal: '' })
  }

  /* 函数防抖优化输入 */
  callAjax = (keywords) => {
    this.state.inputVal &&
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
            result.order.map((item) => {
              return {
                key: item,
                name: chnNames[item],
                lists: result[item],
              }
            })
          this.setState({ searchArr })
        }
      })
  }

  /* 退出登录 */
  loginOut() {
    logOut().then((res) => {
      if (res.code === 200) {
        localStorage.removeItem('m_uid')
        this.props.changeUserMsg({})
        this.props.history.push('/')
      }
    })
  }

  render() {
    const { inputVal, searchArr } = this.state
    const { showLoginFrame, userMsg } = this.props.header
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
              {headerLinks.map((linkObj, index) =>
                this.selectItem(linkObj, index)
              )}
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
                onChange={this.searchChange.bind(this)}
              />

              {inputVal.length > 0 && (
                <div className="search-result-box">
                  <SearchResult
                    searchVal={inputVal}
                    songs={searchArr}
                    toSearchDetail={this.toSearchDetail.bind(this)}
                  />
                </div>
              )}
            </div>

            <a href={authorUrl} className="author-center">
              创作者中心
            </a>

            {Object.keys(userMsg).length > 0 ? (
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
                          this.loginOut()
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
                  src={
                    this.props.header.userMsg.profile.avatarUrl + '?param=30x30'
                  }
                  alt=""
                  className="avatar-url"
                />
              </Dropdown>
            ) : (
              <span
                className="login-btn text-line"
                onClick={() => {
                  this.props.changeShowLoginFrame(true)
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
  }
}

export default withRouter(
  connect((store) => ({ header: store.header }), {
    changeShowLoginFrame,
    changeUserMsg,
  })(Header)
)
