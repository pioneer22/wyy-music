import React, { memo } from 'react'
import './index.scss'

export default memo(function WithOutLogin(props) {
  return (
    <div className="without-login">
      <div className="login-btn"></div>
    </div>
  )
})
