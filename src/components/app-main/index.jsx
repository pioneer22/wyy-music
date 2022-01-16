import React, { memo } from 'react'
import './index.scss'

import { renderRoutes } from 'react-router-config'
import routes from '@/router'

export default memo(function Main() {
  return <>{renderRoutes(routes)}</>
})
