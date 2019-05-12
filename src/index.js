// @vendors
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { routerReducer, routerMiddleware } from 'react-router-redux'

// @components
import Login from 'components/login/login'
import SignUp from 'components/signup/signup'
import Dashboard from 'components/dashboard/dashboard'
import DashboardEventDetail from 'components/dashboard/dashboard.event.edit/dashboard.event.edit.jsx'
import DashboardEventNew from 'components/dashboard/dashboard.event.new/dashboard.event.new'
import DashboardEventEdit from 'components/dashboard/dashboard.event.edit/dashboard.event.edit'

import thunkMiddleware from 'redux-thunk'

// reducers
import usersReducer from 'reduxConfig/reducers/users'
import eventsReducer from 'reduxConfig/reducers/events'

// import general styles
require('./assets/stylesheets/styles.scss')

const mainReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
  routing: routerReducer
})

const history = createBrowserHistory()

const store = createStore(
  mainReducer,
  undefined,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Login} />
        {/* <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/event-detail/:id' component={DashboardEventDetail} />
        <Route path='/event-new/' component={DashboardEventNew} />
        <Route path='/event-edit/:id' component={DashboardEventEdit} /> */}
      </div>
    )
  }
}

const MyApp = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )
}

// render our App componnet and mount it to our #root element
ReactDOM.render(<MyApp />, document.getElementById('root'))
