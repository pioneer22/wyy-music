import React, { memo } from 'react'
import './index.scss'

import FriendLogin from 'pages/without-login/friend_index'
import { useSelector, shallowEqual } from 'react-redux'

export default memo(function Friend(props) {
  const { isLogin } = useSelector(
    (state) => ({
      isLogin: state.header.isLogin,
    }),
    shallowEqual
  )
  return (
    <div className="w980 common-center">
      {isLogin ? <p>朋友</p> : <FriendLogin />}
    </div>
  )
})
