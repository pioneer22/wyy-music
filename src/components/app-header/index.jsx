import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { debounce } from 'lodash'

import { headerLinks, authorUrl } from '@/common/page-data'
import { SearchOutlined } from '@ant-design/icons'
import SearchResult from './search-result'
import './index.scss'

import { connect } from 'react-redux'
import { saveSearchSelect } from '@/redux/actions/header'

import { searchSuggest } from '@/api/global'

class Header extends Component {
  constructor(props) {
    super(props)
    this.route = props
    this.callAjax = debounce(this.callAjax, 400)
    this.callAjax.bind(this)
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
  toSearchDetail(selectObj) {
    this.setState({
      inputVal: '',
    })
    this.props.saveSearchSelect(selectObj)
  }

  /* 函数防抖优化 */
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
          let searchArr = result.order.map((item) => {
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

  render() {
    const { inputVal, searchArr } = this.state
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
              {headerLinks.map((linkObj, index) => {
                return this.selectItem(linkObj, index)
              })}
            </div>
          </div>

          <div className="header-right flex-column">
            <div className="search-container flex-column">
              <span>
                <SearchOutlined />
              </span>
              <input
                placeholder="音乐/视频/电台/用户"
                value={this.state.inputVal}
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

            <a href="#/" className="login-btn">
              登录
            </a>
          </div>
        </div>
        <div className="red-line"></div>
      </div>
    )
  }
}

export default connect((store) => ({ header: store.header }), {
  saveSearchSelect,
})(Header)
