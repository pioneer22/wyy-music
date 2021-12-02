/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'

import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

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
                <div key={index} className="put-img-bar">
                  {putArr.map((putObj) => {
                    return (
                      <NavLink key={putObj.id} to={`/albums?id=${putObj.aid}`}>
                        <div className="put-img-box">
                          <div className="put-img-conatiner">
                            <img src={putObj.picUrlSet}></img>
                          </div>
                          <p className="ellipsis">{putObj.songName}</p>
                          <p className="ellipsis">{putObj.name}</p>
                        </div>
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
