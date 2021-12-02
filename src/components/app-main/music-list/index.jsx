/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import { message } from 'antd'

import { connect } from 'react-redux'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'

class MusicList extends Component {
  playMusic(id) {
    this.props.savePlayList(id, true)
    this.props.changePlayStatus(true)
  }

  render() {
    const { name, coverImgUrl, tracks, id } = this.props
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
                        this.playMusic(musicObj.id)
                      }}
                    ></i>
                    <i
                      onClick={() => {
                        this.props.savePlayList(musicObj.id, false)
                        message.success('已添加~')
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
  }
}
export default connect((store) => ({ player: store.playerBar }), {
  savePlayList,
  changePlayStatus,
})(MusicList)
