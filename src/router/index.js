import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Recommend = lazy(() => import('pages/found-music/recommend'))
const FoundMusic = lazy(() => import('pages/found-music'))
const TopList = lazy(() => import('pages/found-music/toplist'))
const PlayList = lazy(() => import('pages/found-music/playlist'))
const AnchorStation = lazy(() => import('pages/found-music/anchor-station'))
const Artist = lazy(() => import('pages/found-music/artist'))
const NewDisc = lazy(() => import('pages/found-music/new-disc'))

const Friend = lazy(() => import('pages/friend'))
const MyMusic = lazy(() => import('pages/my-music'))

const Error404 = lazy(() => import('pages/404'))

const routes = [
  { path: '/', exact: true, render: () => <Redirect to="/foundMusic" /> },
  {
    path: '/foundMusic', component: FoundMusic,
    routes: [
      {
        path: '/foundMusic',
        exact: true,
        render: () => <Redirect to="/foundMusic/recommend" />,
      },
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
      }
    ]
  },
  {
    path: '/myMusic', component: MyMusic
  },
  {
    path: '/friends', component: Friend
  },
  {
    component: Error404
  }
]

export default routes;