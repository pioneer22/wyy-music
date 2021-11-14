/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import './index.scss'

import * as anchorData from './request'
import TitleBar from 'components/title-bar'
import { Pagination } from 'antd'

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
              <div key={obj.id} className="recommend-item">
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
              <li className="hot-recommend-item flex" key={obj.id}>
                <img src={obj.imgUrl} alt="" />
                <div>
                  <h3 className="ellipsis">{obj.name}</h3>
                  <p className="flex-column">
                    <svg
                      t="1636536683394"
                      className="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2465"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M512 1255.489906M888.810714 711.048571c-20.570058-48.713172-50.145912-92.514092-87.704177-130.072357s-81.359184-67.13412-130.072357-87.704177c-14.020388-5.935639-28.347791-11.052568-42.879872-15.35079 59.151709-38.274635 98.44973-104.897062 98.44973-180.525285 0-118.508095-96.402958-214.911053-214.911053-214.911053s-214.911053 96.402958-214.911053 214.911053c0 75.628223 39.298021 142.25065 98.44973 180.525285-14.532081 4.298221-28.859484 9.415151-42.879872 15.35079-48.713172 20.570058-92.514092 50.145912-130.072357 87.704177s-67.13412 81.359184-87.704177 130.072357c-21.388767 50.452928-32.134319 104.078353-32.134319 159.341195 0 14.122726 11.461923 25.584649 25.584649 25.584649s25.584649-11.461923 25.584649-25.584649c0-95.686588 37.251249-185.642215 104.897062-253.288027 67.645813-67.645813 157.601439-104.897062 253.288027-104.897062 95.686588 0 185.642215 37.251249 253.288027 104.897062s104.897062 157.601439 104.897062 253.288027c0 14.122726 11.461923 25.584649 25.584649 25.584649s25.584649-11.461923 25.584649-25.584649C920.945033 815.126924 910.097142 761.501499 888.810714 711.048571zM347.848891 297.293624c0-90.262642 73.479113-163.741755 163.741755-163.741755s163.741755 73.479113 163.741755 163.741755-73.479113 163.741755-163.741755 163.741755S347.848891 387.556266 347.848891 297.293624z"
                        p-id="2466"
                        fill="#AEAEAE"
                      ></path>
                    </svg>
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
