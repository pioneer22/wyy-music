import React, { memo, useEffect, useRef } from 'react'
import './index.scss'

import { message } from 'antd'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { getPlayUrl, msTurnMins, scrollTo } from 'utils/utils'

import {
  HeartOutlined,
  ClearOutlined,
  CloseOutlined,
  DeleteOutlined,
  LikeOutlined,
  DownloadOutlined,
} from '@ant-design/icons'

import { delPlayList, saveCurrentSong } from '@/redux/actions/player-bar'

export default memo(function PlaylistPanel(props) {
  const lyricRef = useRef()
  const playlistRef = useRef()
  const dispatch = useDispatch()

  const { currentLyricIndex, playList, isPlay, lyricList, playSongIndex } =
    useSelector(
      (state) => ({
        currentLyricIndex: state.playerBar.get('currentLyricIndex'),
        playList: state.playerBar.get('playList'),
        isPlay: state.playerBar.get('isPlay'),
        lyricList: state.playerBar.get('lyricList'),
        playSongIndex: state.playerBar.get('playSongIndex'),
      }),
      shallowEqual
    )

  useEffect(() => {
    if (currentLyricIndex > 0 && currentLyricIndex < 3) return
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollTo(lyricRef.current, (currentLyricIndex - 3) * 30, 300)
  }, [currentLyricIndex])

  // 清空播放列表
  const clearPlayList = () => {
    let ids = playList.map((item) => item.id)
    dispatch(delPlayList(ids))
  }

  // 喜欢歌曲
  const likeMusic = () => {
    message.success('喜欢了歌曲~')
  }

  // 删除当前歌曲
  const delMusic = (id) => {
    new Promise((resolve) => {
      dispatch(delPlayList(id))
      resolve()
    }).then(() => {
      if (isPlay) {
        // 重置当前歌曲
        let songObj = playList[0]
        dispatch(saveCurrentSong(songObj, 0))
      }
    })
  }

  // 点击歌曲
  const switchSong = (songObj, index) => {
    dispatch(saveCurrentSong(songObj, index))
  }

  const { isShowSlider, closePanel } = props
  const lyricLists = lyricList[playSongIndex]

  return (
    <div
      className="playlist-panel"
      style={{ visibility: isShowSlider ? 'visible' : 'hidden' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="playlist-header flex">
        <div className="playlist-header-left flex-between-center">
          <p>播放列表({playList.length})</p>
          <div>
            <span className="text-line">
              <HeartOutlined />
              <span>收藏</span>
            </span>
            <span className="text-line" onClick={clearPlayList}>
              <ClearOutlined />
              <span>清除播放列表</span>
            </span>
          </div>
        </div>
        <div className="playlist-header-right">
          {playList[playSongIndex] && playList[playSongIndex].name}
          <div onClick={closePanel}>
            <CloseOutlined />
          </div>
        </div>
      </div>

      <div className="playlist-main flex" ref={playlistRef}>
        <div className="playlist-main-left">
          <ul>
            {playList.map((songObj, index) => {
              return (
                <li
                  className={`flex-between-center playlist-item ${
                    (playSongIndex || 0) === index ? 'active' : ''
                  }`}
                  key={songObj.id}
                  onClick={() => {
                    switchSong(songObj, index)
                  }}
                >
                  <span>{songObj.name}</span>
                  <div className="flex song-detail">
                    <div className="song-operator flex-between-center">
                      <LikeOutlined onClick={likeMusic} />
                      <DeleteOutlined
                        onClick={() => {
                          delMusic(songObj.id)
                        }}
                      />
                      <DownloadOutlined
                        onClick={() => window.open(getPlayUrl(songObj.id))}
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
        <div className="playlist-main-right" ref={lyricRef}>
          <div className="lyric-content">
            {lyricLists &&
              lyricLists.words.map((line, index) => {
                return (
                  <p
                    className={`lyric-line ${
                      currentLyricIndex === index ? 'active' : ''
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
})
