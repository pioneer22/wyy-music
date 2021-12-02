import React, { Component } from 'react'
import qs from 'querystring'
import './index.scss'

import TitleBar from 'components/title-bar'
import { NavLink } from 'react-router-dom'
import {
  Image,
  message,
  Comment,
  Avatar,
  Form,
  Button,
  Input,
  Pagination,
} from 'antd'
import { LikeOutlined } from '@ant-design/icons'

import { getAlbumDetail, getAlnumComment } from '@/api/global'
import { msTurnMins } from 'utils/utils'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'

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
      return
    }

    this.setState({
      submitting: true,
    })

    setTimeout(() => {
      message.warn('未做~')
      this.setState({
        submitting: false,
        value: '',
      })
    }, 1000)
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    })
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
              <Image
                width={177}
                height={177}
                src="error"
                fallback="data:image/png;base64,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"
              />
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
                <span className="text-line">
                  {album.artist && album.artist.name}
                </span>
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
                          message.success('已添加~')
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
