/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { RightOutlined } from '@ant-design/icons'
import './index.scss'
import { connect } from 'react-redux'
import { savePlayList } from '@/redux/actions/player-bar'

class MusicList extends Component {
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
                  <a href="#" className="ellipsis">
                    {musicObj.name}
                  </a>
                  <div className="music-operator flex-column">
                    <i></i>
                    <i
                      onClick={() => {
                        this.props.savePlayList(musicObj.id)
                      }}
                    ></i>
                    <i></i>
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
})(MusicList)
