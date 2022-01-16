import React, { memo, useState, useEffect } from 'react'
import './index.scss'

import qs from 'querystring'
import TitleBar from 'components/title-bar'
import { NavLink } from 'react-router-dom'
import { LikeOutlined } from '@ant-design/icons'
import { getAlbumDetail, getAlnumComment } from '@/api/global'
import { msTurnMins } from 'utils/utils'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'
import { message, Comment, Avatar, Form, Button, Input, Pagination } from 'antd'
import { repImage } from 'utils/ant'
const { TextArea } = Input

export default memo(function Album(props) {
  const [id, setId] = useState(0)
  const [album, setAlbum] = useState({})
  const [songs, setSongs] = useState([])
  const [total, setTotal] = useState(0)
  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  const { userMsg } = useSelector(
    (state) => ({
      userMsg: state.header?.userMsg,
    }),
    shallowEqual
  )

  useEffect(() => {
    const { search } = props.location
    const { id } = qs.parse(search.slice(1))
    setId(id)
    reqAlbum(id)
  }, [props.location.search]) // eslint-disable-line react-hooks/exhaustive-deps

  const reqAlbum = (id) => {
    getAlbumDetail(id).then((res) => {
      if (res.code === 200) {
        const { songs, album } = res
        setAlbum(album)
        setSongs(songs)
      }
    })
    getAlnumComment({ id, limit: 20 }).then((res) => {
      if (res.code === 200) {
        const { total, comments } = res
        setComments(comments)
        setTotal(total)
      }
    })
  }

  const playMusic = (id) => {
    dispatch(savePlayList(id, true))
    dispatch(changePlayStatus(true))
  }

  // 提交评论
  const handleSubmit = () => {
    if (!value) {
      message.warn('未输入评论内容~')
      return
    }

    this.setState({ submitting: true })
    setTimeout(() => {
      message.warn('未做~')
      setSubmitting(false)
      setValue('')
    }, 1000)
  }

  const changePage = (page, pageSize) => {
    // 分页
    getAlnumComment({ id, offset: page * pageSize, limit: 20 }).then((res) => {
      if (res.code === 200) {
        setComments(res.comments)
      }
    })
  }

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
                        playMusic(songObj.id)
                      }}
                    ></i>
                    <i
                      onClick={() => {
                        dispatch(savePlayList(songObj.id, false))
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
              userMsg?.profile?.avatarUrl ||
              'https://joeschmoe.io/api/v1/random'
            }
            alt="avatar"
          />
        }
        content={
          <>
            <Form.Item>
              <TextArea
                rows={4}
                onChange={(e) => {
                  setValue(e.target.value)
                }}
                value={value}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={submitting}
                onClick={handleSubmit}
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
                    <LikeOutlined style={{ fontSize: '14px', color: '#08c' }} />
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
          onChange={(page, pageSize) => changePage(page, pageSize)}
        />
      </div>
    </div>
  )
})
