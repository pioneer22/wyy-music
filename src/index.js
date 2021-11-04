import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'

import Loading from 'components/loading'

import 'assets/css/reset.css'

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>,
  document.getElementById('root'));
