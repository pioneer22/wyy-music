/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

import { Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import * as playlistData from './getData'

import TitleBar from 'components/title-bar'
import MusicModule from 'components/music-module'
import './index.scss'

const title = (
  <div className="playlist-all">
    <span>全部风格</span>
  </div>
)
export default class Playlist extends Component {
  componentDidMount() {
    playlistData.catList.then((songLists) => {
      this.setState({ songLists })
    })

    playlistData.songTypeList({ limit: 48 }).then((songTypeLists) => {
      this.setState({ songTypeLists })
    })
  }

  state = {
    catTitle: '全部',
    songLists: [],
    songTypeLists: [],
  }

  render() {
    const { catTitle, songLists, songTypeLists } = this.state
    return (
      <div className="w980 playlist-box">
        <TitleBar
          titleObj={{ name: catTitle, link: '' }}
          centerSlot={
            <Popover
              placement="bottomLeft"
              title={title}
              content={
                <div className="playlist-items-container">
                  {songLists.map((types) => {
                    return (
                      <dl className="playlist-item flex" key={types.direction}>
                        <dt className="playlist-direction flex-column">
                          <i
                            className="icon sprite_icon2"
                            style={types.style}
                          ></i>
                          <span>{types.direction}</span>
                        </dt>
                        <dd className="playlist-type flex-column">
                          {types.typeLists.map((item, index) => {
                            return (
                              <div className="playlist-type-item" key={index}>
                                {item}
                              </div>
                            )
                          })}
                        </dd>
                      </dl>
                    )
                  })}
                </div>
              }
              trigger="click"
            >
              <div className="select-classify">
                选择分类 <DownOutlined />
              </div>
            </Popover>
          }
          rightSlot={<button className="playlist-hot">热门</button>}
        ></TitleBar>

        <div className="playlist-type-container">
          <div className="playlist-type-songs flex">
            {songTypeLists.map((lists) => {
              return <MusicModule {...lists} key={lists.id}></MusicModule>
            })}
          </div>
        </div>
      </div>
    )
  }
}
