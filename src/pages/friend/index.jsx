import React, { Component } from 'react'
import './index.scss'

import FriendLogin from 'pages/without-login/friend_index'
import { connect } from 'react-redux'
import curry from 'assets/img/curry.jpeg'
class Friend extends Component {
  render() {
    return (
      <div className="w980 common-center friend">
        {Object.keys(this.props.header.userMsg).length === 0 ? (
          <FriendLogin />
        ) : (
          <div>
            <img src={curry} alt="curry" className="img" />
          </div>
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
