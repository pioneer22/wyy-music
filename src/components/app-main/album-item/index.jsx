import React, { Component } from 'react'
import './index.scss'
import { albumSize } from '@/common/page-data'

export default class AlbumItem extends Component {
  render() {
    const { size, album, bottomSlot } = this.props
    const { width, height } = albumSize[size]
    const imgStyle = this.props.imgStyle || {}
    return (
      <div className="album-item" style={{ width }}>
        <div className="sprite_cover" style={albumSize[size]}>
          <img
            src={
              album.blurPicUrl +
              `?param=${height.slice(0, -2)}x${height.slice(0, -2)}`
            }
            alt=""
            style={{ width: height, height, ...imgStyle }}
          />
        </div>
        {bottomSlot}
      </div>
    )
  }
}
