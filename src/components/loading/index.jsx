import React, { memo } from 'react'
import { Spin } from 'antd'
import './index.scss'

export default memo(function Loading(props) {
  return (
    <div className="loading-box">
      <span>
        <Spin size="large" />
      </span>
    </div>
  )
})
