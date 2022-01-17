/* eslint-disable default-case */
/* eslint-disable no-const-assign */
import React, { lazy, memo, useState, useEffect, useRef } from 'react'
import './index.scss'

import { Slider, Tooltip, message } from 'antd'
import { DownloadOutlined, UndoOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
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

export default memo(function PlayBar(props) {
  const loopRef = useRef()
  const audioRef = useRef()

  const [progress, setProgress] = useState(0) // 滑块进度
  const [playCurrentTime, setPlayCurrentTime] = useState('0:00') // 当前播放到的时间
  const [isShowSlide, setIsShowSlide] = useState(false) // 是否显示播放列表
  const [isShowBar, setIsShowBar] = useState(false) // 是否显示调节音量面板
  const [isChange, setIsChange] = useState(false) // 是否正在滑动播放滚动条
  const dispatch = useDispatch()

  const {
    currentSong,
    isPlay,
    playSongIndex,
    playList,
    lyricList,
    currentLyricIndex,
    playSequence,
  } = useSelector(
    (state) => ({
      currentSong: state.playerBar.get('currentSong'),
      isPlay: state.playerBar.get('isPlay'),
      playSongIndex: state.playerBar.get('playSongIndex'),
      playList: state.playerBar.get('playList'),
      lyricList: state.playerBar.get('lyricList'),
      currentLyricIndex: state.playerBar.get('currentLyricIndex'),
      playSequence: state.playerBar.get('playSequence'),
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(savePlayList(playListId, true)) // 初始化播放列表
  }, [dispatch])

  useEffect(() => {
    audioRef.current.volume = 0.3 // 初始化音量
    audioRef.current.src = getPlayUrl(currentSong.id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isPlay ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlay, currentSong])

  const picUrl = currentSong.al && currentSong.al.picUrl // 图片url
  const songName = currentSong.name // 歌曲名字
  const singerName = currentSong.ar && currentSong.ar[0].name //作者名字
  const duration = currentSong.dt //播放总时间
  const songUrl = getPlayUrl(currentSong.id) // 歌曲URL

  // 音乐播放暂停
  const musicPlay = () => {
    dispatch(changePlayStatus(!isPlay))
    !isPlay ? audioRef.current.play() : audioRef.current.pause()
  }

  // 切换上一首下一首
  const switchSong = (type) => {
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

    audioRef.current.currentTime = 0
    dispatch(saveCurrentSong(playList[newPlaySongIndex], newPlaySongIndex))
  }

  // 更改播放进度条
  const timeUpdate = () => {
    let ct = audioRef.current.currentTime
    if (!isChange) {
      setPlayCurrentTime(msTurnMins(ct * 1000))
      setProgress((ct * 1000 * 100) / duration)
    }

    // 当前播放歌曲歌词
    let i = 0
    let currentLyric = lyricList[playSongIndex]

    // 当前播放到哪一句
    if (currentLyric) {
      for (; i < currentLyric.words.length; i++) {
        const currentItem = currentLyric.words[i]
        if (ct * 1000 < currentItem.currentTotalTime) {
          break
        }
      }
      if (currentLyricIndex !== i - 1) {
        dispatch(changeCurrentLyricIndex(i - 1))
      }
    }
  }

  /* 播放完 */
  const handleTimeEnd = () => {
    dispatch(changePlayStatus(false))
    setPlayCurrentTime('0:00')
    setProgress(0)

    let newIndex = 0
    switch (playSequence) {
      case 0:
        newIndex = playSongIndex === playList.length - 1 ? 0 : playSongIndex + 1
        break
      case 1:
        newIndex = getRandomNum(playList.length)
        while (newIndex === playSongIndex) {
          newIndex = getRandomNum(playList.length)
        }
        break
      case 2:
        newIndex = playSongIndex
        break
      default:
        break
    }

    audioRef.current.currentTime = 0
    dispatch(changeCurrentLyricIndex(0))
    dispatch(saveCurrentSong(playList[newIndex], newIndex))
  }

  /* 播放链接出错 */
  const handleError = () => {
    let del_id = currentSong.id
    message.warn('您不是会员, 暂无播放权限~')
    dispatch(delPlayList(del_id))

    let index = playSongIndex + 1
    dispatch(saveCurrentSong(playList[index], index))
  }

  const sliderChange = (value) => {
    setIsChange(true)
    let currentTime = (value / 100) * duration
    setProgress(value)
    setPlayCurrentTime(msTurnMins(currentTime))
  }

  const slideAfterChange = (value) => {
    let totalTime = currentSong.dt
    audioRef.current.currentTime = (value / 1000 / 100) * totalTime
    setIsChange(false)
  }

  /* 切换播放模式 */
  const changeSequence = () => {
    let position = ['-3px -344px', '-66px -248px', '-66px -344px']
    let index = playSequence === 2 ? 0 : playSequence + 1
    dispatch(savePlaySequence(index))
    loopRef.current.style.backgroundPosition = position[index]
  }

  // 调节音量
  const changingVolume = (value) => {
    audioRef.current.volume = value / 100
  }

  // 关闭播放列表面板
  const closePanel = () => {
    setIsShowSlide(false)
  }

  return (
    <div className="play-bar sprite_player">
      <div className="w980 flex-column">
        <div className="play-box flex-column">
          <button
            className="sprite_player pre"
            onClick={() => switchSong(-1)}
          ></button>
          <button
            className={`sprite_player play ${isPlay ? 'playing' : ''}`}
            onClick={musicPlay}
          ></button>
          <button
            className="sprite_player next"
            onClick={() => switchSong(1)}
          ></button>
        </div>
        <NavLink
          to={`/songs?id=${currentSong?.id}`}
          className="current-img flex-column"
        >
          <img src={picUrl + '?param=35x35'} alt="" />
        </NavLink>
        <div className="play-detail">
          <div className="play-name">
            <NavLink
              to={`/songs?id=${currentSong?.id}`}
              className="text-line ellipsis"
            >
              {songName}
            </NavLink>
            <span className="ellipsis">{singerName}</span>
          </div>

          <Slider
            defaultValue={0}
            value={progress}
            onChange={(value) => sliderChange(value)}
            onAfterChange={(value) => slideAfterChange(value)}
          />
        </div>
        <div className="play-time">
          <span className="play-time-detail">
            <span>{playCurrentTime}</span> / {msTurnMins(duration)}
          </span>
        </div>

        <div className="player-operator flex-column">
          <div className="flex-between-center left-box">
            <Tooltip title="下载音乐">
              <a
                download={songName}
                target="_blank"
                rel="noopener noreferrer"
                href={getPlayUrl(currentSong?.id)}
              >
                <DownloadOutlined className="download" />
              </a>
            </Tooltip>

            <Tooltip title="重新播放">
              <UndoOutlined
                className="refresh"
                onClick={() => {
                  audioRef.current.currentTime = 0
                }}
              />
            </Tooltip>
          </div>

          <div className="right-box sprite_player flex-column">
            <Tooltip title="调节音量">
              <button
                className="sprite_player btn volume"
                onClick={() => {
                  setIsShowBar(!isShowBar)
                }}
              ></button>
            </Tooltip>

            <Tooltip title={['顺序播放', '随机播放', '单曲循环'][playSequence]}>
              <button
                className="sprite_player btn loop"
                ref={loopRef}
                onClick={changeSequence}
              ></button>
            </Tooltip>

            <button
              className="sprite_player btn playlist"
              onClick={(e) => {
                setIsShowSlide(!isShowSlide)
              }}
            >
              <Tooltip title="播放列表">
                <span>{playList?.length}</span>
                <CSSTransition
                  in={isShowSlide}
                  timeout={3300}
                  classNames="playlist"
                >
                  <PlaylistPanel
                    isShowSlider={isShowSlide}
                    closePanel={closePanel.bind(this)}
                  />
                </CSSTransition>
              </Tooltip>
            </button>

            <div
              className="sprite_player top-volume"
              style={{ display: isShowBar ? 'block' : 'none' }}
              onMouseLeave={() => {
                setIsShowBar(false)
              }}
            >
              <Slider
                vertical
                defaultValue={30}
                onChange={(value) => changingVolume(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <audio
        id="audio"
        ref={audioRef}
        onTimeUpdate={() => timeUpdate()}
        onEnded={handleTimeEnd}
        onError={handleError}
        preload="auto"
        src={songUrl}
      />
    </div>
  )
})
