/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

import { Popover, Pagination } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import * as playlistData from './request'

import TitleBar from 'components/title-bar'
import MusicModule from 'components/music-module'
import './index.scss'
export default class Playlist extends Component {
  selectSongList(catTitle) {
    let params =
      catTitle === '全部' ? { limit: 50 } : { limit: 50, cat: catTitle }
    playlistData.songTypeList(params).then((lists) => {
      this.setState({ ...lists, catTitle, current: 1 })
    })
  }

  changePage(page, pageSize) {
    // 分页
    const { catTitle } = this.state
    playlistData
      .songTypeList({ limit: 50, offset: page * pageSize, cat: catTitle })
      .then((lists) => {
        this.setState({ ...lists, current: page })
      })
  }

  componentDidMount() {
    playlistData.catList.then((songLists) => {
      this.setState({ songLists })
    })
    this.selectSongList('全部')
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  state = {
    catTitle: '',
    songLists: [],
    playlists: [],
    total: 0,
    current: 1,
  }

  render() {
    const { catTitle, songLists, playlists, total, current } = this.state
    return (
      <div className="w980 playlist-box">
        <TitleBar
          titleObj={{ name: catTitle, link: '' }}
          centerSlot={
            <Popover
              placement="bottomLeft"
              title={
                <div
                  className="playlist-all"
                  onClick={() => this.selectSongList('全部')}
                >
                  <span>全部风格</span>
                </div>
              }
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
                              <div
                                className="playlist-type-item"
                                key={index}
                                onClick={() => this.selectSongList(item)}
                              >
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
            {playlists.map((lists) => (
              <MusicModule {...lists} key={lists.id}></MusicModule>
            ))}
          </div>
        </div>

        <div className="flex-center">
          <Pagination
            current={current}
            hideOnSinglePage={true}
            pageSize={50}
            total={total}
            showSizeChanger={false}
            showQuickJumper={true}
            onChange={(page, pageSize) => this.changePage(page, pageSize)}
          />
        </div>
      </div>
    )
  }
}
