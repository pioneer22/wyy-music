import React, { Component } from 'react'
import RouterView from '@/router/router-views'
import config from '@/router'

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
        <RouterView routes={config.routes}></RouterView>
        <BackTop>
          <div style={style}>
            TOP
          </div>
        </BackTop>
      </>
    )
  }
}
