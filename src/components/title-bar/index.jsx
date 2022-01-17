import React, { memo } from 'react'
import './index.scss'

export default memo(function TitleBar(props) {
  const { hasIcon, titleObj, centerSlot, rightSlot } = props
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
})
