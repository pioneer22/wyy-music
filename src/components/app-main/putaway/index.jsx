/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'

import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import AlbumItem from 'components/app-main/album-item'
import { NavLink } from 'react-router-dom'
import './index.scss'

const carouserBtn = {
  fontSize: '20px',
  color: '#333',
}

export default class Putaway extends Component {
  render() {
    const { news } = this.props
    return (
      <div className="putaway-box">
        <div className="carouser-left" onClick={() => this.putCarousel.prev()}>
          <LeftOutlined style={carouserBtn} />
        </div>
        <div className="carouser-right" onClick={() => this.putCarousel.next()}>
          <RightOutlined style={carouserBtn} />
        </div>
        <Carousel
          dots={false}
          ref={(c) => (this.putCarousel = c)}
          style={{ width: '608px', margin: '0 auto' }}
        >
          {news &&
            news.map((putArr, index) => {
              return (
                <div key={index} className="put-img-bar flex">
                  {putArr.map((putObj) => {
                    return (
                      <NavLink
                        key={putObj.id}
                        to={`/albums?id=${putObj.aid}`}
                        className="put-img-box"
                      >
                        <AlbumItem
                          size="1"
                          album={{ ...putObj, blurPicUrl: putObj.picUrlSet }}
                          bottomSlot={
                            <>
                              <p className="ellipsis text-line">
                                {putObj.songName}
                              </p>
                              <p className="ellipsis text-line">
                                {putObj.name}
                              </p>
                            </>
                          }
                        />
                      </NavLink>
                    )
                  })}
                </div>
              )
            })}
        </Carousel>
      </div>
    )
  }
}
