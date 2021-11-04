import React, { Component } from 'react'
import { Spin } from 'antd'
import './index.scss'

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-box">
        <span>
          <Spin size="large" />
        </span>
      </div>
    )
  }
}
