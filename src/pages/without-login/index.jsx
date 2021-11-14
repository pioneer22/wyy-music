import React, { Component } from 'react'
import './index.scss'

export default class WithOutLogin extends Component {
  render() {
    return (
      <div className="without-login">
        <div className="login-btn"></div>
      </div>
    )
  }
}
