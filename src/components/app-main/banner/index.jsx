import React, { Component } from 'react'

import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { downloadUrl } from '@/common/page-data'

import { connect } from 'react-redux'
import { saveBanner } from '@/redux/actions/banner'

import { getBanner } from '@/api/foundMusic'

import './index.scss'

const carouserBtn = {
  fontSize: '48px',
  color: 'white',
}

class Banner extends Component {
  changeCarousel = (from, to) => {
    const { banners } = this.state
    this.setState({
      currentBg: banners[to].imageUrl + '?imageView&blur=40x20',
    })
  }

  state = {
    currentBg: '',
    banners: [],
  }

  componentDidMount() {
    getBanner().then((res) => {
      if (res.code === 200) {
        let bannerObj = {
          banners: res.banners,
          currentBg: res.banners[0].imageUrl + '?imageView&blur=40x20',
        }
        this.setState(bannerObj)
        this.props.saveBanner(bannerObj)
      }
    })
  }

  render() {
    const { currentBg, banners } = this.state
    return (
      <div
        className="carousel-container"
        style={{
          background: 'url(' + currentBg + ') center center/6000px',
        }}
      >
        <div className="carouser-content w980">
          <div className="carouser-left" onClick={() => this.carousel.prev()}>
            <LeftOutlined style={carouserBtn} />
          </div>
          <div className="carouser-right" onClick={() => this.carousel.next()}>
            <RightOutlined style={carouserBtn} />
          </div>
          <Carousel
            autoplay
            ref={(c) => (this.carousel = c)}
            style={{ width: '730px' }}
            beforeChange={this.changeCarousel}
          >
            {banners.map((bannerObj) => {
              return (
                <img
                  src={bannerObj.imageUrl}
                  alt={bannerObj.typeTitle}
                  key={bannerObj.targetId}
                />
              )
            })}
          </Carousel>
          <a
            href={downloadUrl}
            className="download-box"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
          </a>
        </div>
      </div>
    )
  }
}

export default connect((store) => ({ banner: store.banner }), {
  saveBanner,
})(Banner)
