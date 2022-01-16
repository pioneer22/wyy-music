/* eslint-disable no-useless-constructor */
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { foundLinks } from '@/common/page-data'

import './index.scss'
import { renderRoutes } from 'react-router-config'
export default memo(function FoundMusic(props) {
  const selectItem = (linkObj) => (
    <NavLink
      key={linkObj.name}
      to={linkObj.link}
      className="found-link-item flex-column"
      activeClassName="found-link-active"
    >
      <span>{linkObj.name}</span>
    </NavLink>
  )

  return (
    <div className="found-music-container">
      <div className="found-select-container">
        <div className="w1100 select-container">
          <div className="flex-column">
            {foundLinks.map((linkObj) => {
              return selectItem(linkObj)
            })}
          </div>
        </div>
      </div>
      {renderRoutes(props.route.routes)}
    </div>
  )
})
