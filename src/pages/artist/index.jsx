import React, { Component, Fragment } from 'react'
import './index.scss'
import qs from 'querystring'

import { NavLink } from 'react-router-dom'
import { msTurnMins, getPlayUrl, delDate } from 'utils/utils'
import { repImage } from 'utils/ant'
import { connect } from 'react-redux'
import { Tabs, message, Pagination } from 'antd'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'

import {
  UserOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
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
              repImage(640, 300)
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
                          {intObj.txt.includes('●')
                            ? intObj.txt
                                .split('●')
                                .slice(1)
                                .map((item, index) => {
                                  return (
                                    <Fragment key={index}>
                                      ●&nbsp;{item}
                                      <br />
                                    </Fragment>
                                  )
                                })
                            : intObj.txt}
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
