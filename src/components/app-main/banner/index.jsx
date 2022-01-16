import React, { memo, useState, useEffect, useRef } from 'react'
import { Carousel, Card } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { downloadUrl } from '@/common/page-data'
import { useDispatch } from 'react-redux'
import { saveBanner } from '@/redux/actions/recommend'
import { getBanner } from '@/api/foundMusic'
import './index.scss'

const carouserBtn = {
  fontSize: '48px',
  color: 'white',
}

export default memo(function Banner() {
  const [currentBg, setCurrentBg] = useState('')
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const carouselRef = useRef()

  const dispatch = useDispatch()
  useEffect(() => {
    getBanner().then((res) => {
      if (res.code === 200) {
        setBanners(res.banners)
        setCurrentBg(res.banners[0].imageUrl + '?imageView&blur=40x20')
        setLoading(false)
        dispatch(saveBanner(res.banners))
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const changeCarousel = (from, to) => {
    setCurrentBg(banners[to].imageUrl + '?imageView&blur=40x20')
  }

  return (
    <div
      className="carousel-container"
      style={{
        background: 'url(' + currentBg + ') center center/6000px',
      }}
    >
      <div className="carouser-content w980">
        <div
          className="carouser-left"
          onClick={() => {
            carouselRef.current.prev()
          }}
        >
          <LeftOutlined style={carouserBtn} />
        </div>
        <div
          className="carouser-right"
          onClick={() => {
            carouselRef.current.next()
          }}
        >
          <RightOutlined style={carouserBtn} />
        </div>
        <Card
          style={{ width: 980 }}
          bodyStyle={{ padding: 0 }}
          loading={loading}
          bordered={false}
        >
          <Carousel
            autoplay
            ref={carouselRef}
            style={{ width: '730px' }}
            beforeChange={changeCarousel}
          >
            {banners.map((bannerObj) => (
              <img
                src={bannerObj.imageUrl}
                alt={bannerObj.typeTitle}
                key={bannerObj.targetId}
              />
            ))}
          </Carousel>
          <a
            href={downloadUrl}
            className="download-box"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
          </a>
        </Card>
      </div>
    </div>
  )
})
