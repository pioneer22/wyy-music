/* eslint-disable import/no-anonymous-default-export */
import { lazy } from 'react'

import Recommend from 'pages/found-music/recommend'
const TopList = lazy(() => import('pages/found-music/toplist'))
const PlayList = lazy(() => import('pages/found-music/playlist'))
const AnchorStation = lazy(() => import('pages/found-music/anchor-station'))
const Artist = lazy(() => import('pages/found-music/artist'))
const NewDisc = lazy(() => import('pages/found-music/new-disc'))

export default [
  {
    path: '/foundMusic/recommend',
    component: Recommend
  },
  {
    path: '/foundMusic/toplist',
    component: TopList
  },
  {
    path: '/foundMusic/playlist',
    component: PlayList
  },
  {
    path: '/foundMusic/djradio',
    component: AnchorStation
  },
  {
    path: '/foundMusic/artist',
    component: Artist
  },
  {
    path: '/foundMusic/album',
    component: NewDisc
  },
]