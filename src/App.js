import React, { Component } from 'react'

import Header from 'components/app-header'
import Main from 'components/app-main'
import Footer from 'components/app-footer'
import PlayBar from 'pages/player-bar'

import { BackTop } from 'antd';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 12,
};
export default class App extends Component {
  render () {
    return (
      <>
        {/* <RouterView routes={config.routes}></RouterView> */}
        <Header />
        <Main />
        <Footer />
        <PlayBar />
        <BackTop>
          <div style={style}>
            TOP
          </div>
        </BackTop>
      </>
    )
  }
}
