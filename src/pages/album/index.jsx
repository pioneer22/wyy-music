import React, { Component } from 'react'
import './index.scss'

import qs from 'querystring'
import TitleBar from 'components/title-bar'
import { NavLink } from 'react-router-dom'
import { LikeOutlined } from '@ant-design/icons'
import { getAlbumDetail, getAlnumComment } from '@/api/global'
import { msTurnMins } from 'utils/utils'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'
import { message, Comment, Avatar, Form, Button, Input, Pagination } from 'antd'
import { repImage } from 'utils/ant'
const { TextArea } = Input

class Album extends Component {
  componentDidMount() {
    this.reqAlbum()
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.reqAlbum()
    }
  }

  state = {
    id: 0,
    album: {},
    songs: [],
    total: 0,
    comments: [],
    submitting: false,
    value: '',
  }

  reqAlbum() {
    const { search } = this.props.location
    const { id } = qs.parse(search.slice(1))
    this.setState({ id })

    getAlbumDetail(id).then((res) => {
      if (res.code === 200) {
        const { songs, album } = res
        this.setState({ album, songs })
      }
    })

    getAlnumComment({ id, limit: 20 }).then((res) => {
      if (res.code === 200) {
        const { total, comments } = res
        this.setState({ comments, total })
      }
    })
  }

  playMusic(id) {
    this.props.savePlayList(id, true)
    this.props.changePlayStatus(true)
  }

  // 提交评论
  handleSubmit = () => {
    if (!this.state.value) {
      message.warn('未输入评论内容~')
      return
    }

    this.setState({ submitting: true })
    setTimeout(() => {
      message.warn('未做~')
      this.setState({
        submitting: false,
        value: '',
      })
    }, 1000)
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  changePage(page, pageSize) {
    // 分页
    const { id } = this.state
    getAlnumComment({ id, offset: page * pageSize, limit: 20 }).then((res) => {
      if (res.code === 200) {
        this.setState({ comments: res.comments })
      }
    })
  }

  render() {
    const { album, songs, total, submitting, value, comments } = this.state
    return (
      <div className="common-center w980 album">
        <div className="album-top flex">
          <div className="sprite_cover">
            {album.blurPicUrl ? (
              <img src={album.blurPicUrl + '?param=177x177'} alt="" />
            ) : (
              repImage(177)
            )}
          </div>

          <div className="album-detail">
            <div className="flex">
              <i className="icons"></i>
              <div className="album-name">
                <span>{album.name}</span>
                <p>{album.alias}</p>
              </div>
            </div>
            <div className="album-person">
              <p>
                歌手:
                <NavLink to={`/artists?id=${album.artist && album.artist.id}`}>
                  <span className="text-line">
                    {album.artist && album.artist.name}
                  </span>
                </NavLink>
              </p>
              <p>
                发行时间:<span>{album.publishTime || '暂无'}</span>
              </p>
              <p>
                发行公司:<span>{album.company || '暂无'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="album-desc">
          <p>专辑介绍：</p>
          <span>{album.description}</span>
        </div>
        <TitleBar
          hasIcon={false}
          titleObj={{ name: '包含歌曲列表' }}
          centerSlot={<span className="track-count">{album.size}首歌</span>}
        ></TitleBar>

        <div className="songs-container">
          <div className="songs-header flex-column">
            <div></div>
            <div>标题</div>
            <div>时长</div>
            <div>歌手</div>
          </div>
          <ul className="songs-content">
            {songs.map((songObj, index) => {
              return (
                <li className="flex-column" key={songObj.id}>
                  <div>{index + 1}</div>
                  <div className="flex-between-center">
                    <NavLink
                      to={`/songs?id=${songObj.id}`}
                      className="text-line ellipsis"
                    >
                      {songObj.name}
                    </NavLink>
                    <div className="opera-box flex-column">
                      <i
                        onClick={() => {
                          this.playMusic(songObj.id)
                        }}
                      ></i>
                      <i
                        onClick={() => {
                          this.props.savePlayList(songObj.id, false)
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className="ellipsis">{msTurnMins(songObj.dt)}</div>
                  <div className="ellipsis">
                    {songObj.ar.map((nameObj) => nameObj.name).join('/')}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <TitleBar
          hasIcon={false}
          titleObj={{ name: '评论' }}
          centerSlot={<span className="track-count">共{total}条评论</span>}
        ></TitleBar>

        <Comment
          avatar={
            <Avatar
              src={
                this.props.header?.userMsg?.profile?.avatarUrl ||
                'https://joeschmoe.io/api/v1/random'
              }
              alt="avatar"
            />
          }
          content={
            <>
              <Form.Item>
                <TextArea rows={4} onChange={this.handleChange} value={value} />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={submitting}
                  onClick={this.handleSubmit}
                  type="primary"
                >
                  评论
                </Button>
              </Form.Item>
            </>
          }
        />

        <div className="comment-container">
          {comments.map((obj, index) => {
            return (
              <div key={index} className="flex comment-item">
                <img src={obj.user.avatarUrl + '?param=50x50'} alt="" />
                <div className="comment-content">
                  <div>
                    <NavLink
                      to={`/user?id=${obj.user.userId}`}
                      className="text-line user-name"
                    >
                      {obj.user.nickname}
                    </NavLink>
                    :<span className="comment-text">{obj.content}</span>
                  </div>
                  <div className="comment-bottom flex-between-center">
                    <span>{obj.timeStr}</span>
                    <div className="flex-column like-box">
                      <LikeOutlined
                        style={{ fontSize: '14px', color: '#08c' }}
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
    )
  }
}

export default withRouter(
  connect((store) => ({ player: store.playerBar, header: store.header }), {
    savePlayList,
    changePlayStatus,
  })(Album)
)
