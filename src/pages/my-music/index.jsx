import React, { Component } from 'react'
import './index.scss'

import WithOutLogin from 'pages/without-login'

export default class MyMusic extends Component {
  render() {
    return (
      <div className="w980 common-center">
        <WithOutLogin />
      </div>
    )
  }
}
