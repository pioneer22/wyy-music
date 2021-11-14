import React, { Component } from 'react'
import './index.scss'

import { renderRoutes } from 'react-router-config'
import routes from '@/router'

export default class Main extends Component {
  render() {
    return <>{renderRoutes(routes)}</>
  }
}
