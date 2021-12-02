import React, { Component, Fragment } from 'react'
import './index.scss'
import qs from 'querystring'

import { NavLink } from 'react-router-dom'
import { msTurnMins, getPlayUrl, delDate } from 'utils/utils'
import { connect } from 'react-redux'

import {
  UserOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import { Tabs, message, Pagination, Image } from 'antd'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'

import {
  getArtistHotSong,
  getArtistAlbum,
  getArtistMV,
  getArtistDetail,
  getArtistDesc,
  getSimiArtist,
} from '@/api/global'

import AlbumItem from 'components/app-main/album-item'
const { TabPane } = Tabs

class Artist extends Component {
  componentDidMount() {
    this.reqArtist()
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.reqArtist()
    }
  }

  state = {
    id: 0,
    artist: {},
    user: {},
    size: 'default',
    songs: [],
    albumSize: 0,
    hotAlbums: [],
    mvs: [],
    introduction: [],
    briefDesc: '',
    simiArtists: [],
  }

  reqArtist() {
    const { search } = this.props.location
    const { id } = qs.parse(search.slice(1))
    this.setState({ id })

    getArtistHotSong(id).then((res) => {
      if (res.code === 200) {
        this.setState({ songs: res.songs })
      }
    })
    getArtistAlbum({ id, limit: 16 }).then((res) => {
      if (res.code === 200) {
        const { hotAlbums } = res
        this.setState({ albumSize: res.artist.albumSize, hotAlbums })
      }
    })
    getArtistDetail(id).then((res) => {
      if (res.code === 200) {
        const { artist } = res.data
        this.setState({ artist, user: res.data.user || {} })
      }
    })
    getArtistMV(id).then((res) => {
      if (res.code === 200) {
        this.setState({ mvs: res.mvs })
      }
    })
    getArtistDesc(id).then((res) => {
      if (res.code === 200) {
        const { introduction, briefDesc } = res
        this.setState({ introduction, briefDesc })
      }
    })
    getSimiArtist(id).then((res) => {
      if (res.code === 200) {
        this.setState({ simiArtists: res.artists })
      }
    })
  }

  playMusic(id) {
    this.props.savePlayList(id, true)
    this.props.changePlayStatus(true)
  }

  changePage(page, pageSize) {
    // 分页
    const { id } = this.state
    getArtistAlbum({ id, limit: 16, offset: page * pageSize }).then((res) => {
      if (res.code === 200) {
        this.setState({ hotAlbums: res.hotAlbums })
      }
    })
  }

  render() {
    const {
      artist,
      user,
      size,
      songs,
      hotAlbums,
      albumSize,
      mvs,
      briefDesc,
      introduction,
      simiArtists,
    } = this.state
    return (
      <div className="w980 common-center artist-detail flex">
        <div className="artist-detail-left">
          <h2>{artist?.name}</h2>
          <div className="cover-box">
            {artist.cover ? (
              <img src={artist?.cover + '?param=640y300'} alt="" />
            ) : (
              <Image
                width={640}
                height={300}
                src="error"
                fallback="data:image/png;base64,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"
              />
            )}

            {Object.keys(user).length > 0 ? (
              <NavLink to={`user?id=${user.userId}`} className="user-btn">
                <UserOutlined
                  style={{
                    fontSize: '14px',
                    color: 'white',
                    marginRight: '4px',
                  }}
                />
                个人主页
              </NavLink>
            ) : (
              ''
            )}
          </div>
          <div className="personal-box">
            <Tabs defaultActiveKey="1" type="card" size={size}>
              <TabPane tab="热门作品" key="1">
                <ul>
                  {songs.map((songObj, index) => {
                    return (
                      <li className="flex-column song-item" key={songObj.id}>
                        <div className="flex-between-center">
                          <span>{index + 1}</span>
                          <PlayCircleOutlined
                            style={{ fontSize: '16px' }}
                            onClick={() => {
                              this.playMusic(songObj.id)
                            }}
                          />
                        </div>
                        <div className="ellipsis flex-between">
                          <NavLink
                            to={`/songs?id=${songObj.id}`}
                            className="text-line"
                          >
                            {songObj.name}
                          </NavLink>
                          <div className="opera-box flex-column">
                            <PlusOutlined
                              style={{ fontSize: '16px' }}
                              onClick={() => {
                                this.props.savePlayList(songObj.id, false)
                                message.success('已添加~')
                              }}
                            />
                            <DownloadOutlined
                              style={{ fontSize: '16px', marginLeft: '5px' }}
                              onClick={() => {
                                window.open(getPlayUrl(songObj.id))
                              }}
                            />
                          </div>
                        </div>
                        <div>{msTurnMins(songObj.dt)}</div>
                        <div className="ellipsis">{songObj.al.name}</div>
                      </li>
                    )
                  })}
                </ul>
              </TabPane>
              <TabPane tab="所有专辑" key="2">
                <ul className="flex-wrap">
                  {hotAlbums.map((albumObj) => {
                    return (
                      <li key={albumObj.id} className="album-items">
                        <NavLink to={`/albums?id=${albumObj.id}`}>
                          <AlbumItem
                            size="2"
                            album={albumObj}
                            bottomSlot={
                              <>
                                <p className="ellipsis text-line">
                                  {albumObj.name}
                                </p>
                                <p className="ellipsis">
                                  {delDate(albumObj.publishTime, '-')}
                                </p>
                              </>
                            }
                          ></AlbumItem>
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
                {albumSize > 16 ? (
                  <div className="flex-center">
                    <Pagination
                      defaultCurrent={1}
                      hideOnSinglePage={true}
                      pageSize={16}
                      total={albumSize}
                      showSizeChanger={false}
                      showQuickJumper={true}
                      onChange={(page, pageSize) =>
                        this.changePage(page, pageSize)
                      }
                    />
                  </div>
                ) : (
                  ''
                )}
              </TabPane>
              <TabPane tab="相关MV" key="3">
                <ul className="mv-box flex-wrap">
                  {mvs.map((mvObj) => {
                    return (
                      <li
                        key={mvObj.id}
                        className="mv-item"
                        onClick={() => {
                          message.warn('未做~')
                        }}
                      >
                        <div>
                          <img src={mvObj.imgurl + '?param=137y103'} alt="" />
                          <i className="sprite_player"></i>
                        </div>
                        <p className="text-line ellipsis">{mvObj.name}</p>
                      </li>
                    )
                  })}
                </ul>
              </TabPane>
              <TabPane tab="艺人介绍" key="4">
                <div className="intro-box">
                  <div className="intro-title">{artist?.name}简介</div>
                  <p>{briefDesc}</p>
                  {introduction.map((intObj) => {
                    return (
                      <Fragment key={intObj.ti}>
                        <div className="intro-title">{intObj.ti}</div>
                        <p className="text-p">
                          {intObj.txt
                            .split('●')
                            .slice(1)
                            .map((item, index) => {
                              return (
                                <Fragment key={index}>
                                  ●&nbsp;{item}
                                  <br />
                                </Fragment>
                              )
                            })}
                        </p>
                      </Fragment>
                    )
                  })}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>

        <div className="artist-detail-right">
          <h3>相似歌手</h3>
          <ul className="flex-wrap simi-box">
            {simiArtists.map((artObj) => {
              return (
                <li key={artObj.id}>
                  <NavLink to={`/artists?id=${artObj.id}`}>
                    <img src={artObj.img1v1Url + '?param=60x60'} alt="" />
                    <p className="ellipsis text-line">{artObj.name}</p>
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

export default connect((store) => ({}), {
  savePlayList,
  changePlayStatus,
})(Artist)
