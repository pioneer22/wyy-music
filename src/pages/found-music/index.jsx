import React, { Component, lazy } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { foundLinks } from '@/common/page-data'

import Recommend from 'pages/found-music/recommend'

import './index.scss'

const TopList = lazy(() => import('pages/found-music/toplist'))
const PlayList = lazy(() => import('pages/found-music/playlist'))

export default class FoundMusic extends Component {
  selectItem = (linkObj) => {
    return (
      <NavLink
        key={linkObj.name}
        to={linkObj.link}
        className="found-link-item flex-column"
        activeClassName="found-link-active"
      >
        <span>{linkObj.name}</span>
      </NavLink>
    )
  }

  render() {
    return (
      <div className="found-music-container">
        <div className="found-select-container">
          <div className="w1100 select-container">
            <div className="flex-column">
              {foundLinks.map((linkObj) => {
                return this.selectItem(linkObj)
              })}
            </div>
          </div>
        </div>
        <Route path="/home/foundMusic/recommend" component={Recommend}></Route>
        <Route path="/home/foundMusic/toplist" component={TopList}></Route>
        <Route path="/home/foundMusic/playlist" component={PlayList}></Route>
      </div>
    )
  }
}
