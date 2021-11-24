/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { foundLinks } from '@/common/page-data'

import './index.scss'
import { renderRoutes } from 'react-router-config'
export default class FoundMusic extends Component {
  constructor(props) {
    super(props)
    this.route = props.route
  }

  selectItem = (linkObj) => (
    <NavLink
      key={linkObj.name}
      to={linkObj.link}
      className="found-link-item flex-column"
      activeClassName="found-link-active"
    >
      <span>{linkObj.name}</span>
    </NavLink>
  )

  render() {
    return (
      <div className="found-music-container">
        <div className="found-select-container">
          <div className="w1100 select-container">
            <div className="flex-column">
              {foundLinks.map((linkObj) => {
                return this.selectItem(linkObj)
              })}
            </div>
          </div>
        </div>
        {renderRoutes(this.route.routes)}
      </div>
    )
  }
}
