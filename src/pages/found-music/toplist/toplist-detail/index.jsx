import React, { Component } from 'react'
import qs from 'querystring'

import { playList } from '../getData'

import './index.scss'

export default class TopListDetail extends Component {
  state = {
    playlistObj: {},
  }
  render() {
    const { search } = this.props.location
    const { id } = qs.parse(search.slice(1))
    id &&
      playList(id).then((playlistObj) => {
        this.setState({ playlistObj })
      })

    const { playlistObj } = this.state
    return (
      <div className="flex">
        <div className="toplist-icon">
          <img src={playlistObj.coverImgUrl} alt="toplist" />
        </div>

        <div className="toplist-current">
          <h2>{playlistObj.name}</h2>
          <div className="flex toplist-update">
            <svg
              t="1635410160809"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1406"
              width="16"
              height="16"
            >
              <path
                d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM511.913993 895.677474c-211.577356 0-383.763481-172.186125-383.763481-383.763481 0-211.577356 172.014111-383.763481 383.763481-383.763481s383.763481 172.014111 383.763481 383.763481S723.491349 895.677474 511.913993 895.677474z"
                p-id="1407"
                fill="#999999"
              ></path>
              <path
                d="M672.05913 511.913993l-159.973123 0L512.086007 288.123635c0-17.717453-14.277171-32.166639-31.994625-32.166639-17.717453 0-31.994625 14.449185-31.994625 32.166639l0 255.956996c0 17.717453 14.277171 31.994625 31.994625 31.994625l191.967747 0c17.717453 0 32.166639-14.277171 32.166639-31.994625C704.053754 526.191164 689.604569 511.913993 672.05913 511.913993z"
                p-id="1408"
                fill="#999999"
              ></path>
            </svg>

            <span className="toplist-update-time">
              最近更新: {playlistObj.updateTime}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
