import React, { Component } from 'react'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { foundLinks } from '@/common/page-data'

import './index.scss'
// import routes from './router'

import { renderRoutes } from 'react-router-config'
import routes from '@/router'
export default class FoundMusic extends Component {
  selectItem = (linkObj) => {
    return (
      <NavLink
        key={linkObj.name}
        to={linkObj.link}
        className="found-link-item flex-column"
        activeClassName="found-link-active"
      >
        <span>{linkObj.name}</span>
      </NavLink>
    )
  }

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

        {/* {routes.map((item, index) => (
          <Route
            path={item.path}
            component={item.component}
            key={index}
          ></Route>
        ))}
        <Redirect to="/foundMusic/recommend"></Redirect> */}
        {renderRoutes(routes[1].routes)}
      </div>
    )
  }
}
