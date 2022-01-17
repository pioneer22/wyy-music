/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react'
import './index.scss'

export default memo(function InSinger(props) {
  const { name, picUrl } = props
  return (
    <div className="in-singer-item flex-column">
      <img src={picUrl} alt="" />
      <div className="singer-info">
        <h4>{name}</h4>
        <p>流行歌手</p>
      </div>
    </div>
  )
})
