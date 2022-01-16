import React, { memo, useState, useEffect, useRef } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import 'pages/playlist/index.scss'
import './index.scss'

import { Collapse, Modal, Button, Input, message } from 'antd'
import {
  CaretRightOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { changeMusicList } from '@/redux/actions/header'
import Draggable from 'react-draggable'

import WithOutLogin from 'pages/without-login'
import TitleBar from 'components/title-bar'
import { delDate, msTurnMins } from 'utils/utils'
import { repImage } from 'utils/ant'
import { NavLink } from 'react-router-dom'
import {
  getPlayList,
  getPlayListDetail,
  getAllPlayList,
  createMusicList,
  deleteMusicList,
} from '@/api/global'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'
const { Panel } = Collapse
const { confirm } = Modal

export default memo(function MyMusic(props) {
  const [musicLists, setMusicLists] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playlist, setPlayList] = useState({})
  const [songs, setSongs] = useState([])
  const [visible, setVisible] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const [name, setName] = useState('')
  const draggleRef = useRef()
  const dispatch = useDispatch()
  const { isLogin, musicList } = useSelector(
    (state) => ({
      isLogin: state.header.isLogin,
      musicList: state.header.musicList,
    }),
    shallowEqual
  )

  useEffect(() => {
    if (isLogin && musicList.length === 0) {
      let id = localStorage.getItem('m_uid')
      getPlayList(id).then((res) => {
        if (res.code === 200) {
          setMusicLists(res.playlist)
          dispatch(changeMusicList(res.playlist))
          reqPlayList(res.playlist[0].id)
        }
      })
    } else {
      setMusicLists(musicLists)
      reqPlayList(musicLists[0].id)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    })
  }

  // 切换歌单
  const switchList = (currentIndex, id) => {
    props.history.push('/myMusic?id=' + id)
    setCurrentIndex(currentIndex)
    reqPlayList(id)
  }

  // 请求歌单
  const reqPlayList = (id) => {
    getPlayListDetail(id).then((res) => {
      res.code === 200 && setPlayList(res.playlist)
    })
    getAllPlayList({ id, limit: 200 }).then((res) => {
      res.code === 200 && setSongs(res.songs)
    })
  }

  // 播放音乐
  const playMusic = (id) => {
    dispatch(savePlayList(id, true))
    dispatch(changePlayStatus(true))
  }

  // 新建歌单
  const handleOk = () => {
    if (name.trim().length === 0) {
      message.warn('请输入歌单名~')
      return
    }

    createMusicList({ name }).then((res) => {
      if (res.code === 200) {
        message.success('歌单新建成功~')
        setVisible(false)
        let id = localStorage.getItem('m_uid')
        getPlayList(id).then((res) => {
          if (res.code === 200) {
            setMusicLists(res.playlist)
            dispatch(changeMusicList(res.playlist))
            reqPlayList(res.playlist[0].id)
          }
        })
      }
    })
  }

  // 取消
  const handleCancel = () => {
    setVisible(false)
  }

  // 删除歌单
  const deleteList = (id, index) => {
    // let _this = this
    confirm({
      title: '确认删除此歌单吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteMusicList(id).then((res) => {
          if (res.code === 200) {
            // const { musicList } = _this.state
            setMusicLists(musicLists.splice(index, 1))
            setCurrentIndex(0)
            dispatch(changeMusicList(musicLists))
            reqPlayList(musicLists[0].id)
            /*  _this.setState({ musicList, currentIndex: 0 })
            _this.props.changeMusicList(musicList)
            _this.reqPlayList(_this.state.musicList[0].id) */
          }
        })
      },
      onCancel() {},
    })
  }
  return (
    <div className="w980 common-center my-music flex">
      {!isLogin ? (
        <WithOutLogin />
      ) : (
        <>
          <div className="my-music-left">
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel
                header={`创建的歌单(${musicList.length})`}
                key="1"
                className="site-collapse-custom-panel"
                extra={
                  <div
                    className="add-btn"
                    onClick={(event) => {
                      event.stopPropagation()
                      setVisible(true)
                    }}
                  >
                    <PlusOutlined
                      style={{
                        fontSize: '10px',
                        color: '#C70C0C',
                        marginRight: '4px',
                      }}
                    />
                    新建
                  </div>
                }
              >
                <ul className="music-list-container">
                  {musicList.map((list, index) => {
                    return (
                      <li
                        key={list.id}
                        className={`flex ${
                          currentIndex === index ? 'active' : ''
                        }`}
                        onClick={() => {
                          switchList(index, list.id)
                        }}
                      >
                        <img src={list.coverImgUrl + '?param=40x40'} alt="" />
                        <div className="flex-between">
                          <p className="ellipsis">{list.name}</p>
                          <div className="flex-between">
                            <p>{list.trackCount}首</p>
                            <DeleteOutlined
                              className="delete"
                              onClick={() => {
                                deleteList(list.id, index)
                              }}
                            />
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </Panel>
            </Collapse>
          </div>
          <div className="my-music-right myplaylist">
            <div className="playlist-top flex">
              {playlist.coverImgUrl ? (
                <img src={playlist.coverImgUrl + '?param=208x208'} alt="" />
              ) : (
                repImage(208)
              )}

              <div className="playlist-detail">
                <div className="flex-column">
                  <i className="icons"></i>
                  <span className="playlist-name">{playlist.name}</span>
                </div>
                <div className="flex-column playlist-person">
                  <img
                    src={
                      playlist &&
                      playlist.creator &&
                      playlist.creator.avatarUrl + '?param=35x35'
                    }
                    alt=""
                  />

                  <NavLink
                    to={`/user?id=${
                      playlist && playlist.creator && playlist.creator.userId
                    }`}
                    className="text-line"
                  >
                    {playlist && playlist.creator && playlist.creator.nickname}
                  </NavLink>

                  <span className="playlist-time">
                    {delDate(playlist.createTime, '-')}
                    &nbsp;创建
                  </span>
                </div>
              </div>
            </div>
            <TitleBar
              hasIcon={false}
              titleObj={{ name: '歌曲列表' }}
              centerSlot={
                <span className="track-count">{playlist.trackCount}首歌</span>
              }
              rightSlot={
                <div className="play-count">
                  播放:<span>{playlist.playCount}</span>次
                </div>
              }
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
                            onClick={() =>
                              dispatch(savePlayList(songObj.id, false))
                            }
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
          </div>
        </>
      )}

      <Modal
        footer={null}
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              disabled && setDisabled(false)
            }}
            onMouseOut={() => {
              setDisabled(true)
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            新建歌单
          </div>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div className="flex add-music-box">
          <div className="music-name">
            <span>歌单名: </span>
          </div>
          <div className="music-content">
            <Input
              placeholder=""
              className="input"
              onChange={({ target }) => {
                setName(target.value)
              }}
            />

            <div className="music-intro">可通过“收藏”将音乐添加到新歌单中</div>
            <div>
              <Button
                type="primary"
                onClick={handleOk}
                style={{ marginRight: '20px' }}
              >
                新建
              </Button>
              <Button onClick={handleCancel}>取消</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
})
