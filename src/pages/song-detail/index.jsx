/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-escape */
import React, { Component, Fragment } from 'react'
import qs from 'querystring'
import './index.scss'

import { NavLink } from 'react-router-dom'
import TitleBar from 'components/title-bar'
import { Pagination, Button } from 'antd'
import { UpOutlined, DownOutlined, LikeOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getPlayUrl } from 'utils/utils'
import songDetail from './request'

import { saveSearchSelect } from '@/redux/actions/header'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'
class SongDetail extends Component {
  state = {
    albumUrl:
      'https://p3.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=132x132',
    id: '',
    words: [],
    show: false,
    simiSongs: [],
    total: 0,
    comments: [],
    hotComments: [],
    songUrlObj: '',
  }

  componentDidMount() {
    this.reqAlbum()
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.reqAlbum()
    }
  }

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return
    }
  }

  reqAlbum() {
    const { id } = qs.parse(this.props.location.search.slice(1))
    this.setState({ id })

    const req = () => {
      const { album } = this.props.header.searchSelect
      album.id &&
        songDetail.reqAlbum(album.id).then((albumUrl) => {
          this.setState(albumUrl)
        })

      if (id) {
        songDetail.reqSongWords(id).then((words) => {
          this.setState(words)
        })

        songDetail.reqSimiSong(id).then((simiSongs) => {
          this.setState({ simiSongs })
        })

        songDetail.reqComment({ id }).then((params) => {
          this.setState(params)
        })
      }
    }
    songDetail
      .reqSongDetail({ keywords: id })
      .then((res) => {
        this.props.saveSearchSelect(res)
      })
      .then(() => {
        req()
      })
  }

  changePage(page, pageSize) {
    // 分页
    const { id } = this.state
    songDetail
      .reqComment({ limit: 20, offset: page * pageSize, id })
      .then((params) => {
        this.setState({ comments: params.comments })
      })
  }

  playMusic(id) {
    this.props.savePlayList(id, true)
    this.props.changePlayStatus(true)
  }

  render() {
    const currentSelect = this.props.header?.searchSelect
    const {
      albumUrl,
      words,
      show,
      simiSongs,
      total,
      hotComments,
      comments,
      id,
    } = this.state
    return (
      <div className="common-center w980 flex song-detail">
        <div className="song-detail-left">
          <div className="song-detail-container flex">
            <div className="song-detail-album">
              <div className="img-cover-box">
                <img src={albumUrl} alt="" />
                <span className="img-cover"></span>
              </div>
            </div>
            <div className="song-detail-box">
              <div className="song-detail-name">
                <span className="sprite_icon2"></span>
                <span>{currentSelect && currentSelect.name}</span>
              </div>
              <p className="song-introduce">
                <span>歌手:</span>
                <span className="ellipsis">
                  {currentSelect &&
                    currentSelect.artists &&
                    currentSelect.artists.map((nameObj, index) => {
                      return (
                        <Fragment key={nameObj.id}>
                          <span className="singer-name text-line">
                            {nameObj.name}
                          </span>
                          {index === currentSelect.artists.length - 1
                            ? ''
                            : ' / '}
                        </Fragment>
                      )
                    })}
                </span>
              </p>
              <p className="song-introduce">
                <span>所属专辑:</span>
                <span className="singer-name text-line">
                  {currentSelect &&
                    currentSelect.album &&
                    currentSelect.album.name}
                </span>
              </p>
              <div className="flex song-operator">
                <div className="sprite_button play">
                  <i
                    className="sprite_button inner"
                    onClick={() => {
                      this.playMusic(id)
                    }}
                  >
                    <em className="sprite_button play-icon"></em>播放
                  </i>
                </div>

                <div
                  className="sprite_button download"
                  onClick={() => window.open(getPlayUrl(id))}
                >
                  <i className="sprite_button inner">
                    <em className="sprite_button favorite-icon"></em>下载
                  </i>
                </div>

                <div className="sprite_button comment">
                  <i className="sprite_button inner">
                    <em className="sprite_button favorite-icon"></em>({total})
                  </i>
                </div>
              </div>
              <div className="song-words">
                {show ? (
                  <>
                    {words.map((text, index) => {
                      return (
                        <Fragment key={index}>
                          {text}
                          <br />
                        </Fragment>
                      )
                    })}
                  </>
                ) : (
                  ''
                )}
                <div
                  className="song-words-show text-line"
                  onClick={() => this.setState({ show: !show })}
                >
                  {show ? (
                    <>
                      收起 <UpOutlined />
                    </>
                  ) : (
                    <>
                      展开歌词 <DownOutlined />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="comment-detail">
            <TitleBar
              titleObj={{ name: '评论' }}
              centerSlot={
                <span style={{ color: '#666', paddingTop: '6px' }}>
                  共{total}条评论
                </span>
              }
            ></TitleBar>

            <div className="flex my-comment">
              <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" />
              <div className="my-comment-box">
                <textarea placeholder="评论"></textarea>
                <Button type="primary" size="small">
                  评论
                </Button>
              </div>
            </div>

            {hotComments && <div className="sd-title">精彩评论</div>}
            <div className="comment-box">
              {hotComments.map((obj, index) => {
                return (
                  <div key={index} className="flex comment-item">
                    <img src={obj.user.avatarUrl + '?param=50x50'} alt="" />
                    <div className="comment-content">
                      <div>
                        <span className="text-line user-name">
                          {obj.user.nickname}
                        </span>
                        :<span className="comment-text">{obj.content}</span>
                      </div>
                      <div className="comment-bottom flex-between-center">
                        <span>{obj.time}</span>
                        <div className="flex-column like-box">
                          <LikeOutlined
                            style={{ fontSize: '16px', color: '#0c73c2' }}
                          />
                          <span>({obj.likedCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="sd-title">最新评论</div>
            <div className="comment-box">
              {comments.map((obj, index) => {
                return (
                  <div key={index} className="flex comment-item">
                    <img src={obj.user.avatarUrl + '?param=50x50'} alt="" />
                    <div className="comment-content">
                      <div>
                        <span className="text-line user-name">
                          {obj.user.nickname}
                        </span>
                        :<span className="comment-text">{obj.content}</span>
                      </div>
                      <div className="comment-bottom flex-between-center">
                        <span>{obj.time}</span>
                        <div className="flex-column like-box">
                          <LikeOutlined
                            style={{ fontSize: '16px', color: '#0c73c2' }}
                          />
                          <span>({obj.likedCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex-center">
              <Pagination
                defaultCurrent={1}
                hideOnSinglePage={true}
                pageSize={20}
                total={total}
                showSizeChanger={false}
                showQuickJumper={true}
                onChange={(page, pageSize) => this.changePage(page, pageSize)}
              />
            </div>
          </div>
        </div>
        <div className="song-detail-right">
          <div className="sd-title">相似歌曲</div>
          {simiSongs.map((obj) => {
            return (
              <div key={obj.id} className="flex-between-center simi-song">
                <div className="simi-song-name">
                  <NavLink
                    to={`/songs?id=${obj.id}`}
                    className="text-line ellipsis"
                  >
                    {obj.name}
                  </NavLink>
                  <div className="ellipsis">
                    {obj.artists.map((item, index) => {
                      return (
                        <Fragment key={item.id}>
                          <span className="singer-name text-line">
                            {item.name}
                          </span>
                          {index === obj.artists.length - 1 ? '' : '/'}
                        </Fragment>
                      )
                    })}
                  </div>
                </div>
                <div
                  className="play-icon"
                  onClick={() => {
                    this.playMusic(obj.id)
                  }}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect((store) => ({ header: store.header }), {
  saveSearchSelect,
  savePlayList,
  changePlayStatus,
})(SongDetail)
