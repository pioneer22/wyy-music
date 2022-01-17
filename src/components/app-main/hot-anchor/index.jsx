/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react'
import './index.scss'

export default memo(function HotAnchor(props) {
  const { nickName, avatarUrl } = props
  return (
    <a href="#" className="hot-anchor-item flex-column">
      <img src={avatarUrl} alt="" />
      <div className="anchor-info">
        <h3>{nickName}</h3>
        <p>热门主播</p>
      </div>
    </a>
  )
})
