import React, { Fragment } from "react";
import { Route, Redirect } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  return <Fragment>
    {props.routes.map((router) => {
      return <Route key={router.path} path={router.path} render={(props) => {
        return (router.children) ? <router.component {...props} routes={router.children} /> : <router.component {...props} />
      }}></Route>
    })}
    <Redirect exact from="/" to="/home/foundMusic/recommend"></Redirect>
  </Fragment>
}