/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect, useState } from 'react'
import qs from 'querystring'
import { Popover, Pagination } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

import * as playlistData from './request'

import TitleBar from 'components/title-bar'
import MusicModule from 'components/music-module'
import './index.scss'

export default memo(function Playlist(props) {
  const [catTitle, setCatTitle] = useState('')
  const [songLists, setSongLists] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)

  const selectSongList = (title) => {
    props.history.push('/foundMusic/playlist?cat=' + title)
    let params = title === '全部' ? { limit: 50 } : { limit: 50, cat: title }
    playlistData.songTypeList(params).then((lists) => {
      setCurrent(1)
      setCatTitle(title)
      setTotal(lists.total)
      setPlaylists(lists.playlists)
    })
  }

  const changePage = (page, pageSize) => {
    // 分页
    playlistData
      .songTypeList({ limit: 50, offset: (page - 1) * pageSize, cat: catTitle })
      .then((lists) => {
        setTotal(lists.total)
        setPlaylists(lists.playlists)
        setCurrent(page)
      })
  }

  useEffect(() => {
    let { search } = props.location
    let { cat } = qs.parse(search.slice(1))
    setCatTitle(cat || '全部')
    playlistData.catList.then((lists) => {
      setSongLists(lists)
    })

    playlistData.songTypeList({ limit: 50 }).then((lists) => {
      setTotal(lists.total)
      setPlaylists(lists.playlists)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w980 playlist-box">
      <TitleBar
        titleObj={{ name: catTitle, link: '' }}
        centerSlot={
          <Popover
            placement="bottomLeft"
            title={
              <div
                className="playlist-all"
                onClick={() => selectSongList('全部')}
              >
                <span>全部风格</span>
              </div>
            }
            content={
              <div className="playlist-items-container">
                {songLists.map((types) => {
                  return (
                    <dl className="playlist-item flex" key={types.direction}>
                      <dt className="playlist-direction flex-column">
                        <i
                          className="icon sprite_icon2"
                          style={types.style}
                        ></i>
                        <span>{types.direction}</span>
                      </dt>
                      <dd className="playlist-type flex-column">
                        {types.typeLists.map((item, index) => {
                          return (
                            <div
                              className="playlist-type-item"
                              key={index}
                              onClick={() => selectSongList(item)}
                            >
                              {item}
                            </div>
                          )
                        })}
                      </dd>
                    </dl>
                  )
                })}
              </div>
            }
            trigger="click"
          >
            <div className="select-classify">
              选择分类 <DownOutlined />
            </div>
          </Popover>
        }
        rightSlot={<button className="playlist-hot">热门</button>}
      ></TitleBar>

      <div className="playlist-type-container">
        <div className="playlist-type-songs flex">
          {playlists.map((lists) => (
            <NavLink key={lists.id} to={`/playlists?id=${lists.id}`}>
              <MusicModule {...lists}></MusicModule>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex-center">
        <Pagination
          current={current}
          hideOnSinglePage={true}
          pageSize={50}
          total={total}
          showSizeChanger={false}
          showQuickJumper={true}
          onChange={changePage}
        />
      </div>
    </div>
  )
})
