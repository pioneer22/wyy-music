/* eslint-disable import/no-anonymous-default-export */
import { lazy } from 'react'

import FoundMusic from 'pages/found-music'
const Friend = lazy(() => import('pages/friend'))
const MyMusic = lazy(() => import('pages/my-music'))

export default [
  {
    path: '/foundMusic',
    component: FoundMusic
  },
  {
    path: '/myMusic',
    component: MyMusic
  },
  {
    path: '/friends',
    component: Friend
  }
]