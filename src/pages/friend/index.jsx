import React, { Component } from 'react'
import './index.scss'

import FriendLogin from 'pages/without-login/friend_index'
import { connect } from 'react-redux'
class Friend extends Component {
  render() {
    return (
      <div className="w980 common-center">
        {Object.keys(this.props.header.userMsg).length === 0 ? (
          <FriendLogin />
        ) : (
          <p>朋友</p>
        )}
      </div>
    )
  }
}

export default connect(
  (store) => ({
    header: store.header,
  }),
  {}
)(Friend)
