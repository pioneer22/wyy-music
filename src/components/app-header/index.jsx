import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { headerLinks, authorUrl } from '@/common/page-data'

import { SearchOutlined } from '@ant-design/icons'

import './index.scss'

export default class Header extends Component {
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

  render() {
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
              <input placeholder="音乐/视频/电台/用户" />
            </div>

            <a href={authorUrl} className="author-center">
              创作者中心
            </a>

            <a href="#/" className="login-btn">
              登录
            </a>
          </div>
        </div>
      </div>
    )
  }
}
