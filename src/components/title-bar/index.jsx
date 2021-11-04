import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

export default class TitleBar extends Component {
  render() {
    const { hasIcon, titleObj, centerSlot, rightSlot } = this.props
    return (
      <div className="title-container flex-between-center">
        <div className="flex-column">
          {hasIcon && <span className="icon-box"></span>}
          <NavLink to={titleObj.link} className="title-content">
            {titleObj.name}
          </NavLink>
          <div className="flex-column">{centerSlot}</div>
        </div>

        {rightSlot}
      </div>
    )
  }
}
