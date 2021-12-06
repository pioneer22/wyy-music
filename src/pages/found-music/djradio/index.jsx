/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import './index.scss'

import * as anchorData from './request'
import TitleBar from 'components/title-bar'
import { message, Pagination } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default class AnchorStation extends Component {
  state = {
    cateId: -1,
    anchorBanners: [],
    anchorRecommends: [],
    hotRecommends: [],
    selectIndex: 0,
    total: 0,
    current: 1,
  }

  componentDidMount() {
    anchorData.djCateList().then((anchorBanners) => {
      this.setState({ anchorBanners, cateId: anchorBanners[0].id })
      Promise.all([
        anchorData.djRecommend(anchorBanners[0].id),
        anchorData.djHotRecommend({ cateId: anchorBanners[0].id }),
      ]).then((res) => {
        this.setState({
          anchorRecommends: res[0],
          ...res[1],
        })
      })
    })
  }

  selectAnchor(selectIndex, anchorObj) {
    Promise.all([
      anchorData.djRecommend(anchorObj.id),
      anchorData.djHotRecommend({ cateId: anchorObj.id }),
    ]).then((res) => {
      this.setState({
        selectIndex,
        current: 1,
        cateId: anchorObj.id,
        anchorRecommends: res[0],
        ...res[1],
      })
    })
  }

  changePage(page, pageSize) {
    anchorData
      .djHotRecommend({ cateId: this.state.cateId, offset: page * pageSize })
      .then((recObj) => {
        this.setState({ ...recObj, current: page })
      })
  }

  render() {
    const {
      anchorBanners,
      anchorRecommends,
      hotRecommends,
      selectIndex,
      total,
      current,
    } = this.state
    return (
      <div className="w980 anchor-container common-center">
        <div className="anchor-banner flex">
          {anchorBanners.map((item, index) => {
            return (
              <div
                className={`flex-column-center anchor-banner-item ${
                  index === selectIndex ? 'active' : ''
                }`}
                key={item.id}
                onClick={() => this.selectAnchor(index, item)}
              >
                <div
                  className="banner-icon"
                  style={{ background: `url(${item.picWebUrl})` }}
                ></div>
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>

        <TitleBar
          titleObj={{ name: '' }}
          centerSlot={
            <span style={{ fontSize: '24px', marginLeft: '-16px' }}>
              优秀新电台
            </span>
          }
        />

        <div className="anchor-recommend-box flex">
          {anchorRecommends.map((obj) => {
            return (
              <div
                key={obj.id}
                className="recommend-item"
                onClick={() => {
                  message.warn('未做~')
                }}
              >
                <img src={obj.imgUrl} alt="" />
                <div className="recommend-item-content">
                  <p>{obj.name}</p>
                  <span>{obj.rcmdtext}</span>
                </div>
              </div>
            )
          })}
        </div>

        <TitleBar
          titleObj={{ name: '' }}
          centerSlot={
            <span style={{ fontSize: '24px', marginLeft: '-16px' }}>
              电台排行榜
            </span>
          }
        />

        <ul className="anchor-hot-recommend flex">
          {hotRecommends.map((obj) => {
            return (
              <li
                className="hot-recommend-item flex"
                key={obj.id}
                onClick={() => {
                  message.warn('未做~')
                }}
              >
                <img src={obj.imgUrl} alt="" />
                <div>
                  <h3 className="ellipsis">{obj.name}</h3>
                  <p className="flex-column">
                    <UserOutlined style={{ fontSize: '14px' }} />
                    <span className="recommend-item-name ellipsis">
                      {obj.name}
                    </span>
                  </p>
                  <p>
                    共{obj.programCount}期&nbsp;&nbsp;&nbsp;订阅{obj.subCount}次
                  </p>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="flex-center">
          <Pagination
            current={current}
            hideOnSinglePage={true}
            pageSize={32}
            total={total}
            showSizeChanger={false}
            showQuickJumper={true}
            onChange={(page, pageSize) => this.changePage(page, pageSize)}
          />
        </div>
      </div>
    )
  }
}
