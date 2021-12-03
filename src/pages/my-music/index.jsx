import React, { Component } from 'react'

import 'pages/playlist/index.scss'
import './index.scss'

import { Collapse, Modal, Button } from 'antd'
import { CaretRightOutlined, PlusOutlined } from '@ant-design/icons'
import { getPlayList } from '@/api/global'
import { changeMusicList } from '@/redux/actions/header'
import Draggable from 'react-draggable'

import WithOutLogin from 'pages/without-login'
import TitleBar from 'components/title-bar'
import { connect } from 'react-redux'
import { delDate, msTurnMins } from 'utils/utils'
import { repImage } from 'utils/ant'
import { NavLink } from 'react-router-dom'
import {
  getPlayListDetail,
  getAllPlayList,
  // createMusicList,
} from '@/api/global'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'
const { Panel } = Collapse
class MyMusic extends Component {
  componentDidMount() {
    const { header } = this.props

    if (
      Object.keys(header.userMsg).length > 0 &&
      header.musicList.length === 0
    ) {
      let id = localStorage.getItem('m_uid')
      getPlayList(id).then((res) => {
        if (res.code === 200) {
          this.setState({ musicList: res.playlist })
          this.props.changeMusicList(res.playlist)
          this.reqPlayList(res.playlist[0].id)
        }
      })
    } else {
      let musicList = this.props.header.musicList
      this.setState({ musicList })
      this.reqPlayList(musicList[0].id)
    }
  }

  state = {
    musicList: [],
    currentIndex: 0,
    playlist: {},
    songs: [],
    visible: false,
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  }

  draggleRef = React.createRef()

  onStart(event, uiData) {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = this.draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    this.setState({
      bounds: {
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      },
    })
  }

  switchList(currentIndex, id) {
    this.props.history.push('/myMusic?id=' + id)
    this.setState({ currentIndex })
    this.reqPlayList(id)
  }

  createList() {
    // createMusicList()
  }

  reqPlayList(id) {
    getPlayListDetail(id).then((res) => {
      if (res.code === 200) {
        this.setState({ playlist: res.playlist })
      }
    })

    getAllPlayList({ id, limit: 200 }).then((res) => {
      if (res.code === 200) {
        this.setState({ songs: res.songs })
      }
    })
  }

  playMusic(id) {
    this.props.savePlayList(id, true)
    this.props.changePlayStatus(true)
  }

  handleOk() {}

  handleCancel() {
    this.setState({ visible: false })
  }

  render() {
    const { header } = this.props
    const {
      musicList,
      currentIndex,
      playlist,
      songs,
      visible,
      bounds,
      disabled,
    } = this.state
    return (
      <div className="w980 common-center my-music flex">
        {Object.keys(header.userMsg).length === 0 ? (
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
                  header={`创建的歌单(${header.musicList.length})`}
                  key="1"
                  className="site-collapse-custom-panel"
                  extra={
                    <div
                      className="add-btn"
                      onClick={(event) => {
                        event.stopPropagation()
                        this.setState({ visible: true })
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
                            this.switchList(index, list.id)
                          }}
                        >
                          <img src={list.coverImgUrl + '?param=40x40'} alt="" />
                          <div className="flex-between">
                            <p className="ellipsis">{list.name}</p>
                            <p>{list.trackCount}首</p>
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
                      {playlist &&
                        playlist.creator &&
                        playlist.creator.nickname}
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
                if (disabled) {
                  this.setState({
                    disabled: false,
                  })
                }
              }}
              onMouseOut={() => {
                this.setState({
                  disabled: true,
                })
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
          onOk={() => {
            this.handleOk()
          }}
          onCancel={() => {
            this.handleCancel()
          }}
          modalRender={(modal) => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => this.onStart(event, uiData)}
            >
              <div ref={this.draggleRef}>{modal}</div>
            </Draggable>
          )}
        >
          <div className="flex">
            <div>
              <span>歌单名: </span>
            </div>
            <div>
              <div>
                <Button
                  onClick={() => {
                    this.handleOk()
                  }}
                >
                  新建
                </Button>
                <Button
                  onClick={() => {
                    this.handleCancel()
                  }}
                >
                  取消
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default connect(
  (store) => ({
    header: store.header,
  }),
  {
    changeMusicList,
    savePlayList,
    changePlayStatus,
  }
)(MyMusic)
