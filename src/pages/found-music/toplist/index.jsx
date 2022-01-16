import React, { memo, Fragment, useState, useEffect } from 'react'
import qs from 'querystring'
import TopListDetail from './toplist-detail'
import * as topData from './request'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  saveSelectList,
  saveTopLists,
  savePlayListDetail,
} from '@/redux/actions/toplist'
import './index.scss'

export default memo(function TopList(props) {
  const [ranks, setRanks] = useState([])

  const dispatch = useDispatch()
  const { topLists } = useSelector(
    (state) => ({
      topLists: state.toplist.topLists,
    }),
    shallowEqual
  )

  useEffect(() => {
    const { search } = props.location
    const { id } = qs.parse(search.slice(1))

    if (topLists) {
      setRanks(topLists)
      let topId = id || topLists[0].id
      topData.playList(topId).then((playlistObj) => {
        dispatch(savePlayListDetail(playlistObj))
      })
    } else {
      topData.topList().then((ranks) => {
        setRanks(ranks)
        dispatch(saveSelectList(ranks[0]))
        dispatch(saveTopLists(ranks))
        topData.playList(ranks[0].id).then((playlistObj) => {
          dispatch(savePlayListDetail(playlistObj))
        })
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const selectList = (rankObj) => {
    dispatch(saveSelectList(rankObj))
    topData.playList(rankObj.id).then((playlistObj) => {
      dispatch(savePlayListDetail(playlistObj))
    })
    props.history.push(`/foundMusic/toplist?id=${rankObj.id}`)
  }

  return (
    <div className="w980 toplist-content">
      <div className="toplist-content-left">
        {ranks.map((rankObj, index) => {
          return (
            <Fragment key={rankObj.id}>
              {index === 0 || index === 4 ? (
                <h3
                  className="ranking-title"
                  style={{ marginTop: index === 4 ? '17px' : '' }}
                >
                  {index === 0
                    ? '云音乐特色榜'
                    : index === 4
                    ? '全球媒体榜'
                    : ''}
                </h3>
              ) : (
                ''
              )}
              <div
                key={rankObj.id}
                className="ranking-item flex"
                onClick={() => {
                  selectList(rankObj)
                }}
              >
                <img src={rankObj.coverImgUrl} alt="" />
                <div>
                  <span>{rankObj.name}</span>
                  <span>{rankObj.updateFrequency}</span>
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>

      <div className="toplist-content-right">
        <TopListDetail />
      </div>
    </div>
  )
})
