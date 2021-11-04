/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

import { Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import TitleBar from 'components/title-bar'
import './index.scss'

const title = (
  <div className="playlist-all">
    <span>全部风格</span>
  </div>
)
const content = (
  <div className="playlist-items-container">
    <div className="playlist-item">
      <div className="playlist-direction">222</div>
      <div className="playlist-type">3333</div>
    </div>
  </div>
)
export default class Playlist extends Component {
  render() {
    return (
      <div className="w980 playlist-box">
        <TitleBar
          titleObj={{ name: '全部', link: '' }}
          centerSlot={
            <Popover
              placement="bottomLeft"
              title={title}
              content={content}
              trigger="click"
            >
              <div className="select-classify">
                选择分类 <DownOutlined />
              </div>
            </Popover>
          }
          rightSlot={<button className="playlist-hot">热门</button>}
        ></TitleBar>
      </div>
    )
  }
}
