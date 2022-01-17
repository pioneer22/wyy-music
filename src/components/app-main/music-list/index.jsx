/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import { message } from 'antd'

import { useDispatch } from 'react-redux'
import { savePlayList } from '@/redux/actions/player-bar'

export default memo(function MusicList(props) {
  const dispatch = useDispatch()
  const playMusic = (id) => {
    dispatch(savePlayList(id, true))
  }

  const { name, coverImgUrl, tracks, id } = props
  return (
    <div className="music-list-box">
      <div className="list-type">
        <img src={coverImgUrl} />
        <div className="list-title">
          <p className="ellipsis">{name}</p>
          <div className="list-operator">
            <i></i>
            <i></i>
          </div>
        </div>
      </div>
      <ol className="music-sort">
        {tracks &&
          tracks.map((musicObj, index) => {
            return (
              <li key={musicObj.id} className="music-item">
                <span>{index + 1}</span>
                <NavLink to={`/songs?id=${musicObj.id}`} className="ellipsis">
                  {musicObj.name}
                </NavLink>
                <div className="music-operator flex-column">
                  <i
                    onClick={() => {
                      playMusic(musicObj.id)
                    }}
                  ></i>
                  <i
                    onClick={() => {
                      dispatch(savePlayList(musicObj.id, false))
                    }}
                  ></i>
                  <i
                    onClick={() => {
                      message.warn('收藏~未做~')
                    }}
                  ></i>
                </div>
              </li>
            )
          })}

        <li className="music-item">
          <NavLink to={`/foundMusic/toplist?id=${id}`}>
            查看全部
            <RightOutlined style={{ fontSize: '12px' }} />
          </NavLink>
        </li>
      </ol>
    </div>
  )
})
