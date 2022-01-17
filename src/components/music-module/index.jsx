import React, { memo } from 'react'
import { delNum } from 'utils/utils'
import './index.scss'

export default memo(function MusicModule(props) {
  const { picUrl, playCount, name } = props
  return (
    <div className="music-module-box">
      <div
        className="music-cover"
        style={{ backgroundImage: `url(${picUrl})` }}
      >
        <div className="music-cover-bottom flex-between-center">
          <span className="cover-bar flex-column">
            <i></i>
            <span>{delNum(playCount)}</span>
          </span>
          <i className="play-icon"></i>
        </div>
      </div>
      <p>{name}</p>
    </div>
  )
})
