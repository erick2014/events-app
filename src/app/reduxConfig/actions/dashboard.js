import {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  TOKEN_EXPIRED
} from '../constants/constants'

import utils from '../../utils/utils'

import {serverUrl, token} from '../../../../env'
import 'whatwg-fetch'

const eventRequest = () => {
  return {
    type: EVENT_REQUEST
  }
}

const eventSuccess = (response, message = '') => ({
  type: EVENT_SUCCESS,
  payload: {
    response: response,
    message: message
  }
})

const eventFailure = err => ({
  type: EVENT_FAILURE,
  payload: err
})

const tokenExpired = () => ({
  type: TOKEN_EXPIRED
})

const fetchEvents = eventId => {
  const fetch = window.fetch
  const urlToFetch = eventId ? `${serverUrl}/events/${eventId}` : `${serverUrl}/events`

  return (dispatch, getState) => {
    // indicate that we are going to lunch the login request
    dispatch(eventRequest())
    // launch the login request
    return fetch(urlToFetch, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': token
      }
    })
      // receive and parse the data
      .then((resp) => {
        if (resp.status && resp.status !== 200) throw resp.json()
        else return resp.json()
      })
      .then((resp) => {
        // process the response
        dispatch(eventSuccess(resp))
      })
      .catch(err => {
        let errMessage
        if (err.error) {
          errMessage = 'Oops! That email and password combination is not valid.'
        } else {
          errMessage = 'Something were wrong :('
        }
        dispatch(eventFailure(errMessage))
      })
  }
}

const createEvent = eventInfo => {
  const fetch = window.fetch
  // info from local storage
  const profileInfo = utils.getProfileInfo()
  // check if we have auth token
  if (profileInfo && profileInfo.authToken) {
    // launch the the request with the auth token
    return (dispatch, getState) => {
      // indicate that we are going to lunch the login request
      dispatch(eventRequest())
      // launch the login request
      return fetch(`${serverUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': token,
          'Authorization': profileInfo.authToken
        },
        body: JSON.stringify(eventInfo)
      })
        // receive and parse the data
        .then((resp) => {
          if (resp.status && (resp.status === 200 || resp.status === 201)) return resp.json()
          else throw resp
        })
        .then((resp) => {
          // process the response
          dispatch(eventSuccess(resp, 'The event has been created successfully'))
        })
        .catch((resp) => {
          const respAsPromise = resp.json()
          respAsPromise.then(result => {
            // redirect user to login to refresh the token
            if (result.error === 'Auth.InvalidToken') {
              dispatch(tokenExpired())
            } else {
              // show a generic error
              dispatch(eventFailure('Something were wrong'))
            }
          })
        })
    }
  }
}

const editEvent = eventInfo => {
  const fetch = window.fetch
  // info from local storage
  const profileInfo = utils.getProfileInfo()
  // check if we have auth token
  if (profileInfo && profileInfo.authToken) {
    // launch the the request with the auth token
    return (dispatch, getState) => {
      // indicate that we are going to lunch the login request
      dispatch(eventRequest())
      // launch the login request
      return fetch(`${serverUrl}/events/${eventInfo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': token,
          'Authorization': profileInfo.authToken
        },
        body: JSON.stringify(eventInfo)
      })
        // receive and parse the data
        .then((resp) => {
          console.log('server response ', resp)
          if (resp.status && (resp.status === 200 || resp.status === 201)) return resp.json()
          else throw resp
        })
        .then((resp) => {
          // process the response
          dispatch(eventSuccess(resp, 'The event has been created successfully'))
        })
        .catch((resp) => {
          const respAsPromise = resp.json()
          respAsPromise.then(result => {
            // redirect user to login to refresh the token
            if (result.error === 'Auth.InvalidToken') {
              dispatch(tokenExpired())
            } else {
              // show a generic error
              dispatch(eventFailure('Something were wrong'))
            }
          })
        })
    }
  }
}

const dashboardActions = {
  fetchEvents,
  createEvent,
  eventFailure,
  editEvent
}

export default dashboardActions
