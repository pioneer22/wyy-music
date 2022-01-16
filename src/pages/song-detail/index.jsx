/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-escape */
import React, { Fragment, memo, useState, useEffect } from 'react'
import qs from 'querystring'
import './index.scss'

import { NavLink } from 'react-router-dom'
import TitleBar from 'components/title-bar'
import { Pagination, Button } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { getPlayUrl } from 'utils/utils'
import songDetail from './request'

import { saveSearchSelect } from '@/redux/actions/header'
import { savePlayList, changePlayStatus } from '@/redux/actions/player-bar'

export default memo(function SongDetail(props) {
  const [albumUrl, setAlbumUrl] = useState(
    'https://p3.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg?param=132x132'
  )
  const [id, setId] = useState('')
  const [words, setWords] = useState([])
  const [show, setShow] = useState(false)
  const [simiSongs, setSimiSongs] = useState([])
  const [total, setTotal] = useState(0)
  const [comments, setComments] = useState([])
  const [hotComments, setHotComments] = useState([])
  const dispatch = useDispatch()

  const { searchSelect } = useSelector(
    (state) => ({
      searchSelect: state.header.searchSelect,
    }),
    shallowEqual
  )

  useEffect(() => {
    const reqAlbum = () => {
      const { id } = qs.parse(props.location.search.slice(1))
      setId(id)
      const req = () => {
        const { album } = searchSelect
        if (album && album.id) {
          songDetail.reqAlbum(album.id).then((albumUrl) => {
            setAlbumUrl(albumUrl)
          })
        }

        if (id) {
          songDetail.reqSongWords(id).then((words) => {
            setWords(words)
          })

          songDetail.reqSimiSong(id).then((simiSongs) => {
            setSimiSongs(simiSongs)
          })

          songDetail.reqComment({ id }).then((params) => {
            setComments(params.comments)
            setHotComments(params.hotComments)
            setTotal(params.total)
          })
        }
      }
      songDetail
        .reqSongDetail({ keywords: id })
        .then((res) => {
          dispatch(saveSearchSelect(res))
        })
        .then(() => {
          req()
        })
    }

    reqAlbum()
  }, [dispatch, searchSelect, props.location.search])

  const changePage = (page, pageSize) => {
    // 分页
    songDetail
      .reqComment({ limit: 20, offset: page * pageSize, id })
      .then((params) => {
        setComments(params.comments)
      })
  }

  const playMusic = (id) => {
    dispatch(savePlayList(id, true))
    dispatch(changePlayStatus(true))
  }

  return (
    <div className="common-center w980 flex song-detail">
      <div className="song-detail-left">
        <div className="song-detail-container flex">
          <div className="song-detail-album">
            <div className="img-cover-box">
              <img src={albumUrl} alt="" />
              <span className="img-cover"></span>
            </div>
          </div>
          <div className="song-detail-box">
            <div className="song-detail-name">
              <span className="sprite_icon2"></span>
              <span>{searchSelect && searchSelect.name}</span>
            </div>
            <p className="song-introduce">
              <span>歌手:</span>
              <span className="ellipsis">
                {searchSelect &&
                  searchSelect.artists &&
                  searchSelect.artists.map((nameObj, index) => {
                    return (
                      <Fragment key={nameObj.id}>
                        <span className="singer-name text-line">
                          {nameObj.name}
                        </span>
                        {index === searchSelect.artists.length - 1 ? '' : ' / '}
                      </Fragment>
                    )
                  })}
              </span>
            </p>
            <p className="song-introduce">
              <span>所属专辑:</span>
              <span className="singer-name text-line">
                {searchSelect && searchSelect.album && searchSelect.album.name}
              </span>
            </p>
            <div className="flex song-operator">
              <div className="sprite_button play">
                <i className="sprite_button inner">
                  <em className="sprite_button play-icon"></em>播放
                </i>
              </div>

              <div
                className="sprite_button download"
                onClick={() => window.open(getPlayUrl(id))}
              >
                <i className="sprite_button inner">
                  <em className="sprite_button favorite-icon"></em>下载
                </i>
              </div>

              <div className="sprite_button comment">
                <i className="sprite_button inner">
                  <em className="sprite_button favorite-icon"></em>({total})
                </i>
              </div>
            </div>
            <div className="song-words">
              {show ? (
                <>
                  {words.map((text, index) => {
                    return (
                      <Fragment key={index}>
                        {text}
                        <br />
                      </Fragment>
                    )
                  })}
                </>
              ) : (
                ''
              )}
              <div
                className="song-words-show text-line"
                onClick={() => {
                  setShow(!show)
                }}
              >
                {show ? (
                  <>
                    收起 <UpOutlined />
                  </>
                ) : (
                  <>
                    展开歌词 <DownOutlined />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="comment-detail">
          <TitleBar
            titleObj={{ name: '评论' }}
            centerSlot={
              <span style={{ color: '#666', paddingTop: '6px' }}>
                共{total}条评论
              </span>
            }
          ></TitleBar>

          <div className="flex my-comment">
            <img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" />
            <div className="my-comment-box">
              <textarea placeholder="评论"></textarea>
              <Button type="primary" size="small">
                评论
              </Button>
            </div>
          </div>

          {hotComments && <div className="sd-title">精彩评论</div>}
          <div className="comment-box">
            {hotComments.map((obj, index) => {
              return (
                <div key={index} className="flex comment-item">
                  <img src={obj.user.avatarUrl + '?param=50x50'} alt="" />
                  <div className="comment-content">
                    <div>
                      <span className="text-line user-name">
                        {obj.user.nickname}
                      </span>
                      :<span className="comment-text">{obj.content}</span>
                    </div>
                    <div className="comment-bottom flex-between-center">
                      <span>{obj.time}</span>
                      <div className="flex-column like-box">
                        <svg
                          t="1637147476149"
                          className="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="2516"
                          width="18"
                          height="18"
                        >
                          <path
                            d="M939.358251 423.424662c-23.01825-37.252439-62.924121-60.779272-107.019409-63.209624-2.755764-0.38681-5.510504-0.579191-8.347109-0.579191l-152.202471-0.121773c6.649444-28.975938 10.015098-58.653865 10.015098-88.657202 0-28.223808-3.213181-57.139372-9.556657-85.952604-0.447185-2.043542-1.098008-4.006244-1.932002-5.866614-15.820314-57.302077-67.37755-96.841605-127.282918-96.841605-72.827679 0-132.081201 59.254545-132.081201 132.081201 0 3.334955 0.132006 6.66991 0.406253 10.015098-2.196015 57.211003-32.108279 109.947088-80.269162 141.363611-14.447037 9.42465-18.524912 28.773324-9.099239 43.220361 9.414417 14.437827 28.752858 18.535145 43.220361 9.099239 65.811892-42.925648 106.429984-115.325585 108.656699-193.684234 0.030699-1.332345-0.010233-2.663666-0.14224-3.996011-0.203638-2.012843-0.304945-4.016477-0.304945-6.019087 0-38.381146 31.233352-69.614497 69.614497-69.614497 32.57593 0 60.474326 22.204721 67.824735 53.997821 0.356111 1.534959 0.823761 3.019777 1.402953 4.453429 4.696975 22.814612 7.076162 45.579081 7.076162 67.743894 0 37.485753-6.222725 74.352405-18.494213 109.592001-3.324722 9.546424-1.819438 20.111037 4.02671 28.345582 5.856381 8.245801 15.332197 13.146415 25.448602 13.156648l193.226816 0.101307c1.423419 0.264013 2.857071 0.426719 4.300956 0.477884 24.116257 0.9967 45.935192 13.614066 58.603723 34.090423 7.838525 12.31242 11.438517 26.800389 10.431583 41.939181-0.080841 0.945535-0.121773 1.911536-0.11154 2.877537 0 0.854461 0.040932 1.697665 0.11154 2.53166 0.010233 0.335644-0.030699 0.661056-0.11154 0.976234-0.101307 0.376577-0.193405 0.772596-0.284479 1.159406l-74.972529 330.391802c-0.914836 1.281179-1.738597 2.6432-2.449795 4.046153-5.937223 11.762905-14.660908 21.48329-25.346271 28.172643-10.746762 6.812149-23.059182 10.614755-35.757388 11.06194-0.854461-0.061398-513.766226-0.224104-513.766226-0.224104-0.467651-0.020466-0.935302-0.030699-1.402953-0.030699 0 0-111.01542 0.172939-112.718201 0.457418-1.932002 0-3.446495-1.50426-3.446495-3.415796l0.299829-416.334173c0-1.901303 1.545192-3.446495 3.01466-3.456728l1.245364 0.121773c1.174756 0.132006 2.653433 0.284479 3.52836 0.193405l83.82822-0.222057 0 339.367221c0 17.253966 13.979386 31.233352 31.233352 31.233352s31.233352-13.979386 31.233352-31.233352L281.009092 435.350273c0-1.778506 0-8.631588 0-10.411117 0-17.253966-13.979386-30.928407-31.233352-30.928407-1.50426 0-117.547183 0.304945-119.402437 0.304945-36.34272 0-65.913199 29.566386-65.913199 65.893756l-0.299829 416.334173c0 36.337603 29.571503 65.902966 65.913199 65.902966 2.541893 0 111.406323-0.457418 111.406323-0.457418 0.457418 0.020466 0.925069 0.030699 1.382487 0.030699 0 0 511.458671 0.274246 512.505513 0.274246 25.469068 0 50.296523-7.197936 71.647807-20.73116 19.612687-12.281721 35.777855-29.881564 46.839795-50.967812 3.660366-5.622044 6.435573-11.875468 8.256034-18.615986 0.11154-0.416486 0.213871-0.823761 0.304945-1.240247l74.881454-330.340637c1.596358-6.212492 2.257413-12.586666 2.00261-18.992563C960.892707 473.366098 953.948551 446.331371 939.358251 423.424662z"
                            p-id="2517"
                            fill="#1175BB"
                          ></path>
                          <path
                            d="M450.027553 518.650467c-17.253966 0-31.233352 13.979386-31.233352 31.233352l0 30.470989c0 17.253966 13.979386 31.233352 31.233352 31.233352 17.253966 0 31.233352-13.979386 31.233352-31.233352l0-30.470989C481.260905 532.629853 467.281519 518.650467 450.027553 518.650467z"
                            p-id="2518"
                            fill="#1175BB"
                          ></path>
                          <path
                            d="M693.805696 518.650467c-17.253966 0-31.233352 13.979386-31.233352 31.233352l0 30.470989c0 17.253966 13.979386 31.233352 31.233352 31.233352 17.253966 0 31.233352-13.979386 31.233352-31.233352l0-30.470989C725.039048 532.629853 711.058638 518.650467 693.805696 518.650467z"
                            p-id="2519"
                            fill="#1175BB"
                          ></path>
                          <path
                            d="M648.940882 660.09492c-14.304797-9.393951-33.592073-5.398964-43.159986 8.763594-0.132006 0.193405-13.614066 19.754926-34.171264 19.754926-19.98824 0-32.423457-18.09717-33.266661-19.368116-9.17087-14.427594-28.254507-18.809391-42.834574-9.770528-14.650675 9.109472-19.155269 28.366048-10.055007 43.016723 11.214413 18.047028 41.96988 48.588625 86.156242 48.588625 43.962258 0 75.104535-30.318516 86.572728-48.222281C667.404396 688.461991 663.216004 669.500127 648.940882 660.09492z"
                            p-id="2520"
                            fill="#1175BB"
                          ></path>
                        </svg>
                        <span>({obj.likedCount})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="sd-title">最新评论</div>
          <div className="comment-box">
            {comments.map((obj, index) => {
              return (
                <div key={index} className="flex comment-item">
                  <img src={obj.user.avatarUrl + '?param=50x50'} alt="" />
                  <div className="comment-content">
                    <div>
                      <span className="text-line user-name">
                        {obj.user.nickname}
                      </span>
                      :<span className="comment-text">{obj.content}</span>
                    </div>
                    <div className="comment-bottom flex-between-center">
                      <span>{obj.time}</span>
                      <div className="flex-column like-box">
                        <svg
                          t="1637147476149"
                          className="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="2516"
                          width="18"
                          height="18"
                        >
                          <path
                            d="M939.358251 423.424662c-23.01825-37.252439-62.924121-60.779272-107.019409-63.209624-2.755764-0.38681-5.510504-0.579191-8.347109-0.579191l-152.202471-0.121773c6.649444-28.975938 10.015098-58.653865 10.015098-88.657202 0-28.223808-3.213181-57.139372-9.556657-85.952604-0.447185-2.043542-1.098008-4.006244-1.932002-5.866614-15.820314-57.302077-67.37755-96.841605-127.282918-96.841605-72.827679 0-132.081201 59.254545-132.081201 132.081201 0 3.334955 0.132006 6.66991 0.406253 10.015098-2.196015 57.211003-32.108279 109.947088-80.269162 141.363611-14.447037 9.42465-18.524912 28.773324-9.099239 43.220361 9.414417 14.437827 28.752858 18.535145 43.220361 9.099239 65.811892-42.925648 106.429984-115.325585 108.656699-193.684234 0.030699-1.332345-0.010233-2.663666-0.14224-3.996011-0.203638-2.012843-0.304945-4.016477-0.304945-6.019087 0-38.381146 31.233352-69.614497 69.614497-69.614497 32.57593 0 60.474326 22.204721 67.824735 53.997821 0.356111 1.534959 0.823761 3.019777 1.402953 4.453429 4.696975 22.814612 7.076162 45.579081 7.076162 67.743894 0 37.485753-6.222725 74.352405-18.494213 109.592001-3.324722 9.546424-1.819438 20.111037 4.02671 28.345582 5.856381 8.245801 15.332197 13.146415 25.448602 13.156648l193.226816 0.101307c1.423419 0.264013 2.857071 0.426719 4.300956 0.477884 24.116257 0.9967 45.935192 13.614066 58.603723 34.090423 7.838525 12.31242 11.438517 26.800389 10.431583 41.939181-0.080841 0.945535-0.121773 1.911536-0.11154 2.877537 0 0.854461 0.040932 1.697665 0.11154 2.53166 0.010233 0.335644-0.030699 0.661056-0.11154 0.976234-0.101307 0.376577-0.193405 0.772596-0.284479 1.159406l-74.972529 330.391802c-0.914836 1.281179-1.738597 2.6432-2.449795 4.046153-5.937223 11.762905-14.660908 21.48329-25.346271 28.172643-10.746762 6.812149-23.059182 10.614755-35.757388 11.06194-0.854461-0.061398-513.766226-0.224104-513.766226-0.224104-0.467651-0.020466-0.935302-0.030699-1.402953-0.030699 0 0-111.01542 0.172939-112.718201 0.457418-1.932002 0-3.446495-1.50426-3.446495-3.415796l0.299829-416.334173c0-1.901303 1.545192-3.446495 3.01466-3.456728l1.245364 0.121773c1.174756 0.132006 2.653433 0.284479 3.52836 0.193405l83.82822-0.222057 0 339.367221c0 17.253966 13.979386 31.233352 31.233352 31.233352s31.233352-13.979386 31.233352-31.233352L281.009092 435.350273c0-1.778506 0-8.631588 0-10.411117 0-17.253966-13.979386-30.928407-31.233352-30.928407-1.50426 0-117.547183 0.304945-119.402437 0.304945-36.34272 0-65.913199 29.566386-65.913199 65.893756l-0.299829 416.334173c0 36.337603 29.571503 65.902966 65.913199 65.902966 2.541893 0 111.406323-0.457418 111.406323-0.457418 0.457418 0.020466 0.925069 0.030699 1.382487 0.030699 0 0 511.458671 0.274246 512.505513 0.274246 25.469068 0 50.296523-7.197936 71.647807-20.73116 19.612687-12.281721 35.777855-29.881564 46.839795-50.967812 3.660366-5.622044 6.435573-11.875468 8.256034-18.615986 0.11154-0.416486 0.213871-0.823761 0.304945-1.240247l74.881454-330.340637c1.596358-6.212492 2.257413-12.586666 2.00261-18.992563C960.892707 473.366098 953.948551 446.331371 939.358251 423.424662z"
                            p-id="2517"
                            fill="#1175BB"
                          ></path>
                          <path
                            d="M450.027553 518.650467c-17.253966 0-31.233352 13.979386-31.233352 31.233352l0 30.470989c0 17.253966 13.979386 31.233352 31.233352 31.233352 17.253966 0 31.233352-13.979386 31.233352-31.233352l0-30.470989C481.260905 532.629853 467.281519 518.650467 450.027553 518.650467z"
                            p-id="2518"
                            fill="#1175BB"
                          ></path>
                          <path
                            d="M693.805696 518.650467c-17.253966 0-31.233352 13.979386-31.233352 31.233352l0 30.470989c0 17.253966 13.979386 31.233352 31.233352 31.233352 17.253966 0 31.233352-13.979386 31.233352-31.233352l0-30.470989C725.039048 532.629853 711.058638 518.650467 693.805696 518.650467z"
                            p-id="2519"
                            fill="#1175BB"
                          ></path>
                          <path
                            d="M648.940882 660.09492c-14.304797-9.393951-33.592073-5.398964-43.159986 8.763594-0.132006 0.193405-13.614066 19.754926-34.171264 19.754926-19.98824 0-32.423457-18.09717-33.266661-19.368116-9.17087-14.427594-28.254507-18.809391-42.834574-9.770528-14.650675 9.109472-19.155269 28.366048-10.055007 43.016723 11.214413 18.047028 41.96988 48.588625 86.156242 48.588625 43.962258 0 75.104535-30.318516 86.572728-48.222281C667.404396 688.461991 663.216004 669.500127 648.940882 660.09492z"
                            p-id="2520"
                            fill="#1175BB"
                          ></path>
                        </svg>
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
      </div>
      <div className="song-detail-right">
        <div className="sd-title">相似歌曲</div>
        {simiSongs.map((obj) => {
          return (
            <div key={obj.id} className="flex-between-center simi-song">
              <div className="simi-song-name">
                <NavLink
                  to={`/songs?id=${obj.id}`}
                  className="text-line ellipsis"
                >
                  {obj.name}
                </NavLink>
                <div className="ellipsis">
                  {obj.artists.map((item, index) => {
                    return (
                      <Fragment key={item.id}>
                        <span className="singer-name text-line">
                          {item.name}
                        </span>
                        {index === obj.artists.length - 1 ? '' : '/'}
                      </Fragment>
                    )
                  })}
                </div>
              </div>
              <div
                className="play-icon"
                onClick={() => {
                  playMusic(obj.id)
                }}
              ></div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
