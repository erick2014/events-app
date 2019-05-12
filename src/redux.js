// @vendors
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

// reducers
import usersReducer from 'reduxConfig/reducers/users'
import eventsReducer from 'reduxConfig/reducers/events'

const mainReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
  routing: routerReducer
})

export const getHistory = () => createBrowserHistory()

export const getStore = () => createStore(
  mainReducer,
  undefined,
  compose(
    applyMiddleware(
      routerMiddleware(getHistory()),
      thunkMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
