import React, { Component } from 'react'
import qs from 'querystring'
import './index.scss'

import TitleBar from 'components/title-bar'
import { NavLink } from 'react-router-dom'
import { getPlayListDetail, getAllPlayList } from '@/api/global'
import { delDate, msTurnMins } from 'utils/utils'
import { repImage } from 'utils/ant'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'

class PlayList extends Component {
  componentDidMount() {
    const { search } = this.props.location
    const { id } = qs.parse(search.slice(1))
    this.reqPlayList(id)
  }

  state = {
    playlist: {},
    songs: [],
  }

  reqPlayList(id) {
    getPlayListDetail(id).then((res) => {
      if (res.code === 200) {
        this.setState({ playlist: res.playlist })
      }
    })

    getAllPlayList({ id, limit: 200 }).then((res) => {
      if (res.code === 200) {
        this.setState({ songs: res.songs })
      }
    })
  }

  playMusic(id) {
    this.props.savePlayList(id, true)
    this.props.changePlayStatus(true)
  }

  render() {
    const { playlist, songs } = this.state
    return (
      <div className="common-center w980 myplaylist">
        <div className="playlist-top flex">
          {playlist.coverImgUrl ? (
            <img src={playlist.coverImgUrl + '?param=208x208'} alt="" />
          ) : (
            repImage(208)
          )}

          <div className="playlist-detail">
            <div className="flex-column">
              <i className="icons"></i>
              <span className="playlist-name">{playlist.name}</span>
            </div>
            <div className="flex-column playlist-person">
              <img
                src={
                  playlist &&
                  playlist.creator &&
                  playlist.creator.avatarUrl + '?param=35x35'
                }
                alt=""
              />

              <NavLink
                to={`/user?id=${
                  playlist && playlist.creator && playlist.creator.userId
                }`}
                className="text-line"
              >
                {playlist && playlist.creator && playlist.creator.nickname}
              </NavLink>

              <span className="playlist-time">
                {delDate(playlist.createTime, '-')}
                &nbsp;创建
              </span>
            </div>
          </div>
        </div>
        <TitleBar
          hasIcon={false}
          titleObj={{ name: '歌曲列表' }}
          centerSlot={
            <span className="track-count">{playlist.trackCount}首歌</span>
          }
          rightSlot={
            <div className="play-count">
              播放:<span>{playlist.playCount}</span>次
            </div>
          }
        ></TitleBar>

        <div className="songs-container">
          <div className="songs-header flex-column">
            <div></div>
            <div>标题</div>
            <div>时长</div>
            <div>歌手</div>
          </div>
          <ul className="songs-content">
            {songs.map((songObj, index) => {
              return (
                <li className="flex-column" key={songObj.id}>
                  <div>{index + 1}</div>
                  <div className="flex-between-center">
                    <NavLink
                      to={`/songs?id=${songObj.id}`}
                      className="text-line ellipsis"
                    >
                      {songObj.name}
                    </NavLink>
                    <div className="opera-box flex-column">
                      <i
                        onClick={() => {
                          this.playMusic(songObj.id)
                        }}
                      ></i>
                      <i
                        onClick={() => {
                          this.props.savePlayList(songObj.id, false)
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className="ellipsis">{msTurnMins(songObj.dt)}</div>
                  <div className="ellipsis">
                    {songObj.ar.map((nameObj) => nameObj.name).join('/')}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect((store) => ({ player: store.playerBar }), {
    savePlayList,
    changePlayStatus,
  })(PlayList)
)
