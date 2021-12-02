import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const Recommend = lazy(() => import('pages/found-music/recommend'))
const FoundMusic = lazy(() => import('pages/found-music'))
const TopList = lazy(() => import('pages/found-music/toplist'))
const PlayList = lazy(() => import('pages/found-music/playlist'))
const Djradio = lazy(() => import('pages/found-music/djradio'))
const Artist = lazy(() => import('pages/found-music/artist'))
const Album = lazy(() => import('pages/found-music/album'))

const Friend = lazy(() => import('pages/friend'))
const MyMusic = lazy(() => import('pages/my-music'))

const SongDetail = lazy(() => import('pages/song-detail'))
const UserDetail = lazy(() => import('pages/user-detail'))
const PlayListDetail = lazy(() => import('pages/playlist'))
const AlbumDetail = lazy(() => import('pages/album'))
const ArtistDetail = lazy(() => import('pages/artist'))

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
        component: Djradio
      },
      {
        path: '/foundMusic/artist',
        component: Artist
      },
      {
        path: '/foundMusic/album',
        component: Album
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
    path: '/songs', component: SongDetail
  },
  {
    path: '/user', component: UserDetail
  },
  {
    path: '/playlist', component: PlayListDetail
  },
  {
    path: '/albums', component: AlbumDetail
  },
  {
    path: '/artists', component: ArtistDetail
  },
  {
    component: Error404
  }
]

export default routes;