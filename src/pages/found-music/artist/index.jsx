import React, { Component } from 'react'
import './index.scss'

import TitleBar from 'components/title-bar'
import { artists } from '@/common/page-data'
import { NavLink } from 'react-router-dom'

import * as req from './request'

const singerType = ['男歌手', '女歌手', '组合/乐队']
export default class Artist extends Component {
  state = {
    selectIndex: 0,
    artistList: [],
    titleIndex: 0,
    singerIndex: 0,
  }

  componentDidMount() {
    req.artistsType({ type: 1, area: 7, limit: 100 }).then((artistList) => {
      this.setState({ artistList })
    })
  }

  selectArtist(area, selectIndex, type, titleIndex) {
    req.artistsType({ area, limit: 100, type }).then((artistList) => {
      this.setState({
        artistList,
        selectIndex,
        titleIndex,
        singerIndex: selectIndex % 3,
      })
    })
  }

  render() {
    const { selectIndex, artistList, titleIndex, singerIndex } = this.state
    return (
      <div className="w980 common-center artist-container flex">
        <div className="artist-left">
          {artists.map((artistObj, index) => {
            return (
              <div key={index} className="left-nav">
                <h3>{artistObj.name}</h3>
                {singerType.map((type, index1) => {
                  return (
                    <p
                      className={
                        selectIndex === index * 3 + index1 ? 'active' : ''
                      }
                      onClick={() =>
                        this.selectArtist(
                          artistObj.area,
                          index * 3 + index1,
                          index1 + 1,
                          index
                        )
                      }
                    >
                      {artistObj.name}
                      {type}
                    </p>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="artist-right">
          <TitleBar
            titleObj={{
              name: `${artists[titleIndex].name}${singerType[singerIndex]}`,
            }}
          />

          <ul className="flex-wrap artist-box">
            {artistList.map((obj, index) => {
              return index < 10 ? (
                <li key={obj.id} className={index > 4 ? 'line' : ''}>
                  <NavLink to={`/artists?id=${obj.id}`}>
                    <img src={`${obj.img1v1Url}?param=130x130`} alt="" />
                    <p>{obj.name}</p>
                  </NavLink>
                </li>
              ) : (
                <li key={obj.id} style={{ paddingBottom: '2px' }}>
                  <NavLink to={`/artists?id=${obj.id}`}>
                    <p>{obj.name}</p>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
