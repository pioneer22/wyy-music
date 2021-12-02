/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import './index.scss'

export default class InSinger extends Component {
  render() {
    const { name, picUrl } = this.props
    return (
      <div className="in-singer-item flex-column">
        <img src={picUrl} alt="" />

        <div className="singer-info">
          <h4>{name}</h4>
          <p>流行歌手</p>
        </div>
      </div>
    )
  }
}
