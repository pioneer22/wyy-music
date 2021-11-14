import React, { Component } from 'react'
import './index.scss'

import FriendLogin from 'pages/without-login/friend_index'
export default class Friend extends Component {
  render() {
    return (
      <>
        <div className="red-line"></div>
        <div className="w980 common-center">
          <FriendLogin />
        </div>
      </>
    )
  }
}
