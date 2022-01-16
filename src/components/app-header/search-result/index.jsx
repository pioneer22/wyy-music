import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

export default memo(function SearchResult(props) {
  const handlePush = () => {
    let timer = setTimeout(() => {
      props.toSearchDetail()
      clearTimeout(timer)
    }, 500)
  }

  const { style, searchVal, songs } = props
  return (
    <div className="search-result-container" style={style}>
      <p className="search-result-title">搜"{searchVal}"相关用户&gt;</p>
      {songs &&
        songs.map((songObj, index) => {
          return (
            <div className="flex search-result-content" key={index}>
              <div className="search-result-type">{songObj.name}</div>
              <ul className="search-result-detail">
                {songObj.lists &&
                  songObj.lists.map((song) => {
                    return (
                      <li key={song.id} className="ellipsis">
                        <NavLink
                          to={`/${songObj.key}?id=${song.id}`}
                          key={song.id}
                          className="search-result-url"
                          onClick={handlePush}
                        >
                          {song.name}
                        </NavLink>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )
        })}
    </div>
  )
})
