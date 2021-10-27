import React, { Component } from 'react'
import RouterView from '@/router/router-views'
import config from '@/router'

export default class App extends Component {
  render () {
    return (
      <RouterView routes={config.routes}></RouterView>
    )
  }
}
