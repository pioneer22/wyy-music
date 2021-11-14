import React, { Component } from 'react'
import './index.scss'

export default class TitleBar extends Component {
  render() {
    const { hasIcon, titleObj, centerSlot, rightSlot } = this.props
    return (
      <div className="title-container flex-between-center">
        <div className="flex-column">
          {hasIcon && <span className="icon-box"></span>}
          <div className="title-content">{titleObj.name}</div>
          <div className="flex-column">{centerSlot}</div>
        </div>
        {rightSlot}
      </div>
    )
  }
}
