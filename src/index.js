// @vendors
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { getHistory, getStore } from './redux'
import Routing from './routing'

// import general styles
require('./assets/stylesheets/styles.scss')

const store = getStore()
const history = getHistory()

const MyApp = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routing />
      </Router>
    </Provider>
  )
}

// render our App componnet and mount it to our #root element
ReactDOM.render(<MyApp />, document.getElementById('root'))
