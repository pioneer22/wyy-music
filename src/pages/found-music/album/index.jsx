import React, { memo, useState, useEffect } from 'react'
import './index.scss'
import TitleBar from 'components/title-bar'
import AlbumItem from 'components/app-main/album-item'
import { Pagination } from 'antd'
import { albumArea } from '@/common/page-data'
import { NavLink } from 'react-router-dom'
import * as req from './request'

export default memo(function NewDisc(props) {
  const [allAlbums, setAllAlbums] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [area, setArea] = useState('ALL')
  const [title, setTitle] = useState('全部')

  useEffect(() => {
    req.allAlbum().then((album) => {
      setTotal(album.total)
      setAllAlbums(album.allAlbums)
    })
  }, [])

  const changePage = (page, pageSize) => {
    req
      .allAlbum({ area: area, offset: (page - 1) * pageSize })
      .then((album) => {
        setTotal(album.total)
        setAllAlbums(album.allAlbums)
        setCurrent(page)
      })
  }

  const changeArea = (area) => {
    req.allAlbum({ area }).then((album) => {
      setArea(area)
      setTotal(album.total)
      setAllAlbums(album.allAlbums)
      setCurrent(1)
    })
    albumArea.some((item) => {
      if (area === item.type) {
        setTitle(item.name)
        return true
      }
      return false
    })
  }

  return (
    <div className="w980 common-center new-disc-container">
      <TitleBar
        titleObj={{ name: title + '新碟' }}
        centerSlot={
          <>
            {albumArea.map((areaObj) => (
              <span
                key={areaObj.type}
                className="area-item"
                onClick={() => changeArea(areaObj.type)}
              >
                {areaObj.name}
              </span>
            ))}
          </>
        }
      />

      <div className="flex-between new-disc-box">
        {allAlbums.map((obj) => (
          <NavLink
            to={`/albums?id=${obj.id}`}
            key={obj.id}
            className="new-disc-item"
          >
            <AlbumItem
              size="3"
              album={{ blurPicUrl: `${obj.picUrl}?param=130x130` }}
              bottomSlot={
                <>
                  <p className="ellipsis text-line">{obj.name}</p>
                  <p className="ellipsis text-line">{obj.artist.name}</p>
                </>
              }
            />
          </NavLink>
        ))}
      </div>

      <div className="flex-center">
        <Pagination
          current={current}
          hideOnSinglePage={true}
          pageSize={30}
          total={total}
          showSizeChanger={false}
          showQuickJumper={true}
          onChange={changePage}
        />
      </div>
    </div>
  )
})
