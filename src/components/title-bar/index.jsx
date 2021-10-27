import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

export default class TitleBar extends Component {
  render() {
    const { titleObj, links } = this.props
    return (
      <div className="title-container flex-between-center">
        <div className="flex-column">
          <span className="icon-box"></span>
          <NavLink to="titleObj.link" className="title-content">
            {titleObj.name}
          </NavLink>
          <div className="flex-column">
            {links &&
              links.map((item) => {
                return (
                  <NavLink
                    to={item.link}
                    key={item.name}
                    className="link-active"
                  >
                    {item.name}
                  </NavLink>
                )
              })}
          </div>
        </div>

        <div>
          更多<i className="more-icon"></i>
        </div>
      </div>
    )
  }
}
