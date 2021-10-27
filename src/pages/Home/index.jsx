import React, { Component } from 'react'
import Header from 'components/app-header'
import Main from 'components/app-main'
import Footer from 'components/app-footer'

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    )
  }
}
