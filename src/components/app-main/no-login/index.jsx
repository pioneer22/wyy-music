import React, { memo } from 'react'
import './index.scss'
import { useDispatch } from 'react-redux'
import { changeShowLoginFrame } from '@/redux/actions/header'

export default memo(function NoLogin(props) {
  const dispatch = useDispatch()
  return (
    <div className="no-login-box">
      <div className="sprite_02 no-login-info">
        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
        <button
          className="user-login sprite_02"
          onClick={() => dispatch(changeShowLoginFrame(true))}
        >
          用户登录
        </button>
      </div>
    </div>
  )
})
