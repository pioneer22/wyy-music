import React, { Component } from 'react'
import './index.scss'

import TitleBar from 'components/title-bar'
import { artist } from '@/common/page-data'

import * as req from './request'

export default class Artist extends Component {
  state = {
    selectIndex: 0,
    artistList: [],
  }

  componentDidMount() {
    req.artists().then((artistList) => {
      this.setState({ artistList })
    })
  }

  selectArtist(type, selectIndex) {
    req.artists(type).then((artistList) => {
      this.setState({ artistList, selectIndex })
    })
  }

  render() {
    const { selectIndex, artistList } = this.state
    return (
      <div className="w980 common-center artist-container flex">
        <div className="artist-left">
          {artist.map((artistObj, index) => {
            return (
              <div key={index} className="left-nav">
                <h3>{artistObj.name}</h3>
                <p
                  className={selectIndex === index ? 'active' : ''}
                  onClick={() => this.selectArtist(artistObj.type, index)}
                >
                  {artistObj.name}歌手
                </p>
              </div>
            )
          })}
        </div>
        <div className="artist-right">
          <TitleBar titleObj={{ name: `${artist[selectIndex].name}歌手` }} />

          <ul className="flex-wrap artist-box">
            {artistList.map((obj, index) => {
              return index < 10 ? (
                <li key={obj.id} className={index > 4 ? 'line' : ''}>
                  <img src={`${obj.img1v1Url}?param=130x130`} alt="" />
                  <p>{obj.name}</p>
                </li>
              ) : (
                <li key={obj.id} style={{ paddingBottom: '2px' }}>
                  <p>{obj.name}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
