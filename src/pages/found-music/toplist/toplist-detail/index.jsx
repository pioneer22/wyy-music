/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { msTurnMins } from 'utils/utils'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'
import { repImage } from 'utils/ant'
import './index.scss'
class TopListDetail extends Component {
  playMusic(id) {
    this.props.savePlayList(id, true)
    this.props.changePlayStatus(true)
  }

  render() {
    const { playListDetail } = this.props.toplist
    return (
      <>
        {playListDetail ? (
          <Fragment>
            <div className="flex">
              <div className="toplist-icon">
                {playListDetail.coverImgUrl ? (
                  <img src={playListDetail.coverImgUrl} alt="toplist" />
                ) : (
                  repImage(150, 150)
                )}
              </div>

              <div className="toplist-current">
                <h2>{playListDetail.name}</h2>
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
                    ????????????: {playListDetail.updateTime}
                    {playListDetail.updateFrequency ? (
                      <span>({playListDetail.updateFrequency})</span>
                    ) : (
                      ''
                    )}
                  </span>
                </div>

                <div className="flex play-box">
                  <div className="sprite_button play">
                    <i className="sprite_button inner">
                      <em className="sprite_button play-icon"></em>??????
                    </i>
                  </div>

                  <div className="sprite_button favorite">
                    <i className="sprite_button inner">
                      <em className="sprite_button favorite-icon"></em>(
                      {playListDetail.subscribedCount})
                    </i>
                  </div>

                  <div className="sprite_button share">
                    <i className="sprite_button inner">
                      <em className="sprite_button favorite-icon"></em>(
                      {playListDetail.shareCount})
                    </i>
                  </div>

                  <div className="sprite_button download">
                    <i className="sprite_button inner">
                      <em className="sprite_button favorite-icon"></em>??????
                    </i>
                  </div>

                  <div className="sprite_button comment">
                    <i className="sprite_button inner">
                      <em className="sprite_button favorite-icon"></em>(
                      {playListDetail.commentCount})
                    </i>
                  </div>
                </div>
              </div>
            </div>

            <div className="song-lists">
              <div className="flex-between song-bar">
                <div className="song-bar-title">
                  <span>????????????</span>
                  100??????
                </div>

                <div className="play-count">
                  ????????? <span>{playListDetail.playCount}</span> ???
                </div>
              </div>
            </div>

            <div className="toplist-song">
              <div className="song-header flex">
                <div className="sprite_table header-item"></div>
                <div className="sprite_table header-item">??????</div>
                <div className="sprite_table header-item">??????</div>
                <div className="sprite_table header-item">??????</div>
              </div>
              <div className="song-list-box">
                {playListDetail &&
                  playListDetail.tracks.slice(0, 100).map((songObj, index) => {
                    return (
                      <div className="song-item-box flex" key={songObj.id}>
                        <div className="song-item flex-center">
                          <span>{index + 1}</span>
                        </div>
                        <div className="song-item flex-column">
                          {index < 3 && (
                            <img src={songObj.al.picUrl + '?param=50x50'} />
                          )}
                          <div className="flex-between song-detail">
                            <div className="flex-column">
                              <svg
                                t="1635933839272"
                                className="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="3990"
                                width="26"
                                height="26"
                                onClick={() => {
                                  this.playMusic(songObj.id)
                                }}
                              >
                                <path
                                  d="M512.3 928.1c-229.2 0-415-185.8-415-415s185.8-415 415-415 415 185.8 415 415-185.8 415-415 415z m2.4-75.3c186.2 0 337.2-151 337.2-337.2s-151-337.2-337.2-337.2-337.2 151-337.2 337.2 151 337.2 337.2 337.2z m-67.8-498.6l233.8 136.9c12.3 7.3 16.5 23.2 9.2 35.5-2.3 3.8-5.5 7-9.3 9.3L446.9 671.8c-12.4 7.2-28.3 3-35.5-9.3-2.3-4-3.5-8.5-3.5-13.1V376.5c0-14.3 11.6-25.9 26-25.9 4.5 0 9 1.2 13 3.6z"
                                  p-id="3991"
                                  fill="#B3B3B3"
                                ></path>
                              </svg>

                              <NavLink
                                to={`/songs?id=${songObj.id}`}
                                className="song-name ellipsis text-line"
                              >
                                {songObj.name}
                              </NavLink>
                            </div>

                            <div className="flex-column">
                              <button
                                onClick={() => {
                                  this.props.savePlayList(songObj.id)
                                }}
                                className="sprite_icon2 add_btn"
                              ></button>
                            </div>
                          </div>
                        </div>
                        <div className="song-item flex-column">
                          {msTurnMins(songObj.dt)}
                        </div>
                        <div className="song-item flex-column">
                          {songObj.ar[0].name}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </Fragment>
        ) : (
          ''
        )}
      </>
    )
  }
}

export default connect(
  (store) => ({
    toplist: store.toplist,
  }),
  {
    savePlayList,
    changePlayStatus,
  }
)(TopListDetail)
