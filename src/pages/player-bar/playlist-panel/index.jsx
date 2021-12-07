import React, { Component } from 'react'
import './index.scss'

import { message } from 'antd'
import { connect } from 'react-redux'
import { getPlayUrl, msTurnMins, scrollTo } from 'utils/utils'

import {
  HeartOutlined,
  ClearOutlined,
  CloseOutlined,
  DeleteOutlined,
  LikeOutlined,
  DownloadOutlined,
} from '@ant-design/icons'

import {
  delPlayList,
  saveCurrentSong,
  changePlayStatus,
} from '@/redux/actions/player-bar'

class PlaylistPanel extends Component {
  lyricRef = React.createRef()

  componentDidUpdate() {
    let player = this.props.playerBar
    let currentLyricIndex = player.get('currentLyricIndex')
    if (currentLyricIndex > 0 && currentLyricIndex < 3) return
    scrollTo(this.lyricRef.current, (currentLyricIndex - 3) * 30, 300)
  }

  // 清空播放列表
  clearPlayList() {
    let ids = this.props.playerBar.get('playList').map((item) => item.id)
    this.props.delPlayList(ids)
  }

  // 喜欢歌曲
  likeMusic() {
    message.success('喜欢了歌曲~')
  }

  // 删除当前歌曲
  delMusic(id) {
    new Promise((resolve) => {
      this.props.delPlayList(id)
      resolve()
    }).then(() => {
      if (this.props.playerBar.get('currentSong').id === id) {
        // 重置当前歌曲
        let songObj = this.props.playerBar.get('playList')[0]
        this.props.saveCurrentSong(songObj, 0)
      }
    })
  }

  // 点击歌曲
  switchSong(songObj, index) {
    new Promise((resolve) => {
      this.props.saveCurrentSong(songObj, index)
      resolve()
    }).then(() => {
      this.props.changePlayStatus(true)
    })
  }

  render() {
    const { isShowSlider, closePanel } = this.props
    const player = this.props.playerBar
    const lyricList = player.get('lyricList')[player.get('playSongIndex')]
    const playSongIndex = player.get('playSongIndex')
    return (
      <div
        className="playlist-panel"
        style={{ visibility: isShowSlider ? 'visible' : 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="playlist-header flex">
          <div className="playlist-header-left flex-between-center">
            <p>播放列表({player.get('playList').length})</p>
            <div>
              <span className="text-line">
                <HeartOutlined />
                <span>收藏</span>
              </span>
              <span
                className="text-line"
                onClick={() => {
                  this.clearPlayList()
                }}
              >
                <ClearOutlined />
                <span>清除播放列表</span>
              </span>
            </div>
          </div>
          <div className="playlist-header-right">
            {player.get('playList')[playSongIndex] &&
              player.get('playList')[playSongIndex].name}
            <div onClick={closePanel}>
              <CloseOutlined />
            </div>
          </div>
        </div>

        <div className="playlist-main flex" ref="playlistRef">
          <div className="playlist-main-left">
            <ul>
              {player.get('playList').map((songObj, index) => {
                return (
                  <li
                    className={`flex-between-center playlist-item ${
                      (playSongIndex || 0) === index ? 'active' : ''
                    }`}
                    key={songObj.id}
                    onClick={() => {
                      this.switchSong(songObj, index)
                    }}
                  >
                    <span>{songObj.name}</span>
                    <div className="flex song-detail">
                      <div className="song-operator flex-between-center">
                        <LikeOutlined
                          onClick={(event) => {
                            event.stopPropagation()
                            this.likeMusic()
                          }}
                        />
                        <DeleteOutlined
                          onClick={(event) => {
                            event.stopPropagation()
                            this.delMusic(songObj.id)
                          }}
                        />
                        <DownloadOutlined
                          onClick={(event) => {
                            event.stopPropagation()
                            window.open(getPlayUrl(songObj.id))
                          }}
                        />
                      </div>
                      <span>{songObj.ar[0].name}</span>
                      <span>{msTurnMins(songObj.dt)}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="playlist-main-right" ref={this.lyricRef}>
            <div className="lyric-content">
              {lyricList &&
                lyricList.words.map((line, index) => {
                  return (
                    <p
                      className={`lyric-line ${
                        player.get('currentLyricIndex') === index
                          ? 'active'
                          : ''
                      }`}
                      key={index}
                    >
                      {line.content}
                    </p>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((store) => ({ playerBar: store.playerBar }), {
  delPlayList,
  saveCurrentSong,
  changePlayStatus,
})(PlaylistPanel)
