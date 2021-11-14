import React, { Component } from 'react'
import './index.scss'
import TitleBar from 'components/title-bar'
import { Pagination } from 'antd'
import { albumArea } from '@/common/page-data'
import * as req from './request'

export default class NewDisc extends Component {
  state = {
    allAlbums: [],
    total: 0,
    current: 1,
    area: 'ALL',
  }

  componentDidMount() {
    req.allAlbum().then((album) => {
      this.setState(album)
    })
  }

  changePage(page, pageSize) {
    req
      .allAlbum({ area: this.state.area, offset: page * pageSize })
      .then((album) => {
        this.setState({ ...album, current: page })
      })
  }

  changeArea(area) {
    req.allAlbum({ area }).then((album) => {
      this.setState({ ...album, current: 1 })
    })
  }

  render() {
    const { allAlbums, total, current } = this.state
    return (
      <div className="w980 common-center new-disc-container">
        <TitleBar
          titleObj={{ name: '全部新碟' }}
          centerSlot={
            <>
              {albumArea.map((areaObj) => {
                return (
                  <span
                    key={areaObj.type}
                    className="area-item"
                    onClick={() => this.changeArea(areaObj.type)}
                  >
                    {areaObj.name}
                  </span>
                )
              })}
            </>
          }
        />

        <div className="flex-between new-disc-box">
          {allAlbums.map((obj) => {
            return (
              <div key={obj.id} className="new-disc-item">
                <div>
                  <img src={`${obj.picUrl}?param=130x130`} alt="" />
                </div>
                <h3 className="ellipsis">{obj.name}</h3>
                <p className="ellipsis">{obj.artist.name}</p>
              </div>
            )
          })}
        </div>

        <div className="flex-center">
          <Pagination
            current={current}
            hideOnSinglePage={true}
            pageSize={30}
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
