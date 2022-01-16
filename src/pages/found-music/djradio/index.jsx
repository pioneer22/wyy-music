/* eslint-disable jsx-a11y/alt-text */
import React, { memo, useState, useEffect } from 'react'
import './index.scss'

import * as anchorData from './request'
import TitleBar from 'components/title-bar'
import { Pagination } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default memo(function AnchorStation(props) {
  const [cateId, setCateId] = useState(-1)
  const [anchorBanners, setAnchorBanners] = useState([])
  const [anchorRecommends, setAnchorRecommends] = useState([])
  const [hotRecommends, setHotRecommends] = useState([])
  const [selectIndex, setSelectIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    anchorData.djCateList().then((aBanners) => {
      setAnchorBanners(aBanners)
      setCateId(aBanners[0].id)
      Promise.all([
        anchorData.djRecommend(aBanners[0].id),
        anchorData.djHotRecommend({ cateId: aBanners[0].id }),
      ]).then((res) => {
        setAnchorRecommends(res[0])
        setHotRecommends(res[1].hotRecommends)
        setTotal(res[1].total)
      })
    })
  }, [])

  const selectAnchor = (selectIndex, anchorObj) => {
    Promise.all([
      anchorData.djRecommend(anchorObj.id),
      anchorData.djHotRecommend({ cateId: anchorObj.id }),
    ]).then((res) => {
      setSelectIndex(selectIndex)
      setCurrent(1)
      setCateId(anchorObj.id)
      setAnchorRecommends(res[0])
      setHotRecommends(res[1].hotRecommends)
      setTotal(res[1].total)
    })
  }

  const changePage = (page, pageSize) => {
    anchorData
      .djHotRecommend({ cateId: cateId, offset: (page - 1) * pageSize })
      .then((recObj) => {
        setCurrent(page)
        setHotRecommends(recObj.hotRecommends)
        setTotal(recObj.total)
      })
  }

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
              onClick={() => selectAnchor(index, item)}
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
          onChange={(page, pageSize) => changePage(page, pageSize)}
        />
      </div>
    </div>
  )
})
