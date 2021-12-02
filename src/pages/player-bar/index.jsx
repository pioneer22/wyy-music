/* eslint-disable default-case */
/* eslint-disable no-const-assign */
import React, { Component, lazy } from 'react'
import './index.scss'

import { Slider, Tooltip, message } from 'antd'
import { DownloadOutlined, UndoOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { getPlayUrl, msTurnMins, getRandomNum } from 'utils/utils'
import { SONG_PLAYLIST_ID as playListId } from '@/common/page-data'

import {
  savePlaySequence,
  savePlayList,
  saveCurrentSong,
  changeCurrentLyricIndex,
  changePlayStatus,
  delPlayList,
} from '@/redux/actions/player-bar'

const PlaylistPanel = lazy(() => import('./playlist-panel'))

class PlayBar extends Component {
  loopRef = React.createRef()
  audioRef = React.createRef()

  state = {
    progress: 0, // 滑块进度
    playCurrentTime: '0:00', // 当前播放到的时间
    currentTime: 0, // 当前播放时间
    isShowSlide: false, // 是否显示播放列表
    isShowBar: false, // 是否显示调节音量面板
    isChange: false, // 是否正在滑动播放滚动条
  }

  componentDidMount() {
    this.props.savePlayList(playListId, true) // 初始化播放列表
    this.audioRef.current.volume = 0.3 // 初始化音量
    this.audioRef.current.src = getPlayUrl(
      this.props.playerBar.get('currentSong').id
    )
  }

  componentDidUpdate() {
    this.props.playerBar.get('isPlay')
      ? this.audioRef.current.play()
      : this.audioRef.current.pause()
  }

  // 音乐播放暂停
  musicPlay() {
    let isPlay = this.props.playerBar.get('isPlay')
    this.props.changePlayStatus(!isPlay)
    !isPlay ? this.audioRef.current.play() : this.audioRef.current.pause()
  }

  // 切换上一首下一首
  switchSong(type) {
    let playerBar = this.props.playerBar
    let playSongIndex = playerBar.get('playSongIndex')
    let playList = playerBar.get('playList')
    let newPlaySongIndex = 0
    if (type > 0) {
      /* 切换下一首 */
      if (playList.length - 1 === playSongIndex) {
        message.warning('当前是播放列表最后一首歌曲了~')
        return
      } else {
        newPlaySongIndex = playSongIndex + 1
      }
    } else {
      /* 切换上一首 */
      if (playSongIndex === 0) {
        message.warning('当前是播放列表第一首歌曲了~')
        return
      } else {
        newPlaySongIndex = playSongIndex - 1
      }
    }

    new Promise((resolve) => {
      this.audioRef.current.currentTime = 0
      this.props.saveCurrentSong(playList[newPlaySongIndex], newPlaySongIndex)
      resolve()
    }).then(() => {
      this.audioRef.current.play()
      this.props.changePlayStatus(true)
    })
  }

  // 更改播放进度条
  timeUpdate() {
    let playerBar = this.props.playerBar
    let ct = this.audioRef.current.currentTime
    let totalTime = playerBar.get('currentSong').dt

    if (!this.state.isChange) {
      this.setState({
        playCurrentTime: msTurnMins(ct * 1000),
        progress: (ct * 1000 * 100) / totalTime,
      })
    }

    // 当前播放歌曲歌词
    let i = 0
    let currentLyric =
      playerBar.get('lyricList')[playerBar.get('playSongIndex')]

    // 当前播放到哪一句
    if (currentLyric) {
      for (; i < currentLyric.words.length; i++) {
        const currentItem = currentLyric.words[i]
        if (ct * 1000 < currentItem.currentTotalTime) {
          break
        }
      }
      if (playerBar.get('currentLyricIndex') !== i - 1) {
        this.props.changeCurrentLyricIndex(i - 1)
      }
    }
  }

  /* 播放完 */
  handleTimeEnd() {
    this.props.changePlayStatus(false)
    this.setState({
      playCurrentTime: '0:00',
      progress: 0,
    })
    let playerBar = this.props.playerBar
    let playSongIndex = playerBar.get('playSongIndex')
    let playList = playerBar.get('playList')
    let playSequence = playerBar.get('playSequence')
    let newIndex = 0

    switch (playSequence) {
      case 0:
        newIndex = playSongIndex === playList.length - 1 ? 0 : playSongIndex + 1
        break
      case 1:
        newIndex = getRandomNum(playerBar.get('playList').length)
        while (newIndex === playSongIndex) {
          newIndex = getRandomNum(playerBar.get('playList').length)
        }
        break
      case 2:
        newIndex = playSongIndex
        break
      default:
        break
    }

    new Promise((resolve) => {
      this.audioRef.current.currentTime = 0
      this.props.changeCurrentLyricIndex(0)
      this.props.saveCurrentSong(playList[newIndex], newIndex)
      resolve()
    }).then(() => {
      this.audioRef.current.play()
      this.props.changePlayStatus(true)
    })
  }

  /* 播放链接出错 */
  handleError() {
    let playerBar = this.props.playerBar
    let del_id = playerBar.get('currentSong').id
    message.warn('您不是会员, 暂无播放权限~')
    this.props.delPlayList(del_id)

    let playList = playerBar.get('playList')
    let playSongIndex = playerBar.get('playSongIndex') + 1
    this.props.saveCurrentSong(playList[playSongIndex], playSongIndex)
  }

  sliderChange(value) {
    this.setState({ isChange: true })
    let currentTime = (value / 100) * this.props.playerBar.get('currentSong').dt
    this.setState({ progress: value, playCurrentTime: msTurnMins(currentTime) })
  }

  slideAfterChange(value) {
    let totalTime = this.props.playerBar.get('currentSong').dt
    this.audioRef.current.currentTime = (value / 1000 / 100) * totalTime
    this.setState({ isChange: false })
  }

  /* 切换播放模式 */
  changeSequence() {
    let position = ['-3px -344px', '-66px -248px', '-66px -344px']
    let playSequence = this.props.playerBar.get('playSequence')
    let index = playSequence === 2 ? 0 : playSequence + 1
    this.props.savePlaySequence(index)
    this.loopRef.current.style.backgroundPosition = position[index]
  }

  // 调节音量
  changingVolume(value) {
    this.audioRef.current.volume = value / 100
  }

  // 关闭播放列表面板
  closePanel() {
    this.setState({ isShowSlide: false })
  }

  render() {
    const { progress, isShowSlide, isShowBar, playCurrentTime } = this.state
    const { playerBar } = this.props
    let currentSong = playerBar.get('currentSong')
    let isPlay = playerBar.get('isPlay')
    return (
      <div className="play-bar sprite_player">
        <div className="w980 flex-column">
          <div className="play-box flex-column">
            <button
              className="sprite_player pre"
              onClick={() => this.switchSong(-1)}
            ></button>
            <button
              className={`sprite_player play ${isPlay ? 'playing' : ''}`}
              onClick={() => this.musicPlay()}
            ></button>
            <button
              className="sprite_player next"
              onClick={() => this.switchSong(1)}
            ></button>
          </div>
          <NavLink
            to={`/songs?id=${currentSong.id}`}
            className="current-img flex-column"
          >
            <img src={currentSong.al.picUrl + '?param=35x35'} alt="" />
          </NavLink>
          <div className="play-detail">
            <div className="play-name">
              <NavLink
                to={`/songs?id=${currentSong.id}`}
                className="text-line ellipsis"
              >
                {currentSong.name}
              </NavLink>
              <span className="ellipsis">{currentSong.ar[0].name}</span>
            </div>

            <Slider
              defaultValue={0}
              value={progress}
              onChange={(value) => this.sliderChange(value)}
              onAfterChange={(value) => this.slideAfterChange(value)}
            />
          </div>
          <div className="play-time">
            <span className="play-time-detail">
              <span>{playCurrentTime}</span> / {msTurnMins(currentSong.dt)}
            </span>
          </div>

          <div className="player-operator flex-column">
            <div className="flex-between-center left-box">
              <Tooltip title="下载音乐">
                <a
                  download={currentSong.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={getPlayUrl(currentSong.id)}
                >
                  <DownloadOutlined className="download" />
                </a>
              </Tooltip>

              <Tooltip title="重新播放">
                <UndoOutlined
                  className="refresh"
                  onClick={() => {
                    this.audioRef.current.currentTime = 0
                  }}
                />
              </Tooltip>
            </div>

            <div className="right-box sprite_player flex-column">
              <Tooltip title="调节音量">
                <button
                  className="sprite_player btn volume"
                  onClick={() => {
                    this.setState({ isShowBar: !isShowBar })
                  }}
                ></button>
              </Tooltip>

              <Tooltip
                title={
                  ['顺序播放', '随机播放', '单曲循环'][
                    playerBar.get('playSequence')
                  ]
                }
              >
                <button
                  className="sprite_player btn loop"
                  ref={this.loopRef}
                  onClick={(e) => this.changeSequence()}
                ></button>
              </Tooltip>

              <button
                className="sprite_player btn playlist"
                onClick={(e) => {
                  this.setState({ isShowSlide: !isShowSlide })
                }}
              >
                <Tooltip title="播放列表">
                  <span>{playerBar.get('playList').length}</span>
                  <CSSTransition
                    in={isShowSlide}
                    timeout={3300}
                    classNames="playlist"
                  >
                    <PlaylistPanel
                      isShowSlider={isShowSlide}
                      closePanel={this.closePanel.bind(this)}
                    />
                  </CSSTransition>
                </Tooltip>
              </button>

              {/* 调节音量 */}
              <div
                className="sprite_player top-volume"
                style={{ display: isShowBar ? 'block' : 'none' }}
                onMouseLeave={() => {
                  this.setState({ isShowBar: false })
                }}
              >
                <Slider
                  vertical
                  defaultValue={30}
                  onChange={(value) => this.changingVolume(value)}
                />
              </div>
            </div>
          </div>
        </div>
        <audio
          id="audio"
          ref={this.audioRef}
          onTimeUpdate={() => this.timeUpdate()}
          onEnded={() => this.handleTimeEnd()}
          onError={() => this.handleError()}
          preload="auto"
          src={getPlayUrl(currentSong.id)}
        />
      </div>
    )
  }
}

export default connect((store) => ({ playerBar: store.playerBar }), {
  savePlaySequence,
  savePlayList,
  saveCurrentSong,
  changeCurrentLyricIndex,
  changePlayStatus,
  delPlayList,
})(PlayBar)
