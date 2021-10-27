import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import FoundMusic from '@/pages/found-music'

import './index.scss'

export default class Main extends Component {
  render() {
    return (
      <>
        <Route path="/home/foundMusic" component={FoundMusic}></Route>
        <Redirect to="/home/foundMusic"></Redirect>
      </>
    )
  }
}
