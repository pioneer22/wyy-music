import React, { memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

import qs from 'querystring'
import TitleBar from 'components/title-bar'
import MusicModule from 'components/music-module'

import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import { getPlayList, getUserDetail } from '@/api/global'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { changeMusicList } from '@/redux/actions/header'
import address from '@/common/address'
import { repImage } from 'utils/ant'

export default memo(function UserDetail(props) {
  const [playlist, setPlaylist] = useState([])
  const [profile, setProfile] = useState({})
  const dispatch = useDispatch()

  const { musicList } = useSelector(
    (state) => ({
      musicList: state.header.musicList,
    }),
    shallowEqual
  )

  useEffect(() => {
    const { search } = props.location
    const { id } = qs.parse(search.slice(1))
    if (musicList.length === 0) {
      getPlayList(id).then((res) => {
        if (res.code === 200) {
          setPlaylist(res.playlist)
          dispatch(changeMusicList(res.playlist))
        }
      })
    } else {
      setPlaylist(musicList)
    }
    getUserDetail(id).then((res) => {
      if (res.code === 200) {
        setProfile(res.profile)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="common-center w980 user">
      <div className="user-basic flex">
        {profile?.avatarUrl ? (
          <img
            src={profile?.avatarUrl + '?param=188x188'}
            alt=""
            className="user-avatar"
          />
        ) : (
          repImage(188)
        )}

        <div className="user-content">
          <div className="flex-column user-content-top">
            <h3>{profile?.nickname}</h3>
            {profile?.gender === 1 ? (
              <ManOutlined style={{ color: '#26a6e4', fontSize: '16px' }} />
            ) : (
              <WomanOutlined style={{ color: '#e60026', fontSize: '16px' }} />
            )}
          </div>

          <ul className="flex user-content-center">
            <li>
              <p>{profile?.eventCount}</p>
              <span>动态</span>
            </li>
            <li>
              <p>{profile?.follows}</p>
              <span>关注</span>
            </li>
            <li>
              <p>{profile?.followeds}</p>
              <span>粉丝</span>
            </li>
          </ul>
          <div className="user-content-bottom">
            <p>所在地区:&nbsp;&nbsp;{address[profile?.city]}</p>
            <p>个人签名:&nbsp;&nbsp;{profile?.signature || '暂无'}</p>
          </div>
        </div>
      </div>

      <TitleBar
        hasIcon="true"
        titleObj={{
          name: `创建的歌单(${playlist.length})`,
        }}
        rightSlot={
          <div>
            <i className="more-icon"></i>
          </div>
        }
      ></TitleBar>

      <ul className="user-playlist flex-wrap">
        {playlist.map((listObj) => {
          return (
            <li className="playlist-item" key={listObj.id}>
              <NavLink to={`/playlists?id=${listObj.id}`}>
                <MusicModule
                  {...listObj}
                  picUrl={listObj.coverImgUrl + '?param=140x140'}
                ></MusicModule>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
