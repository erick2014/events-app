import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../constants/constants'

import {serverUrl, token} from '../../../../env'
import 'whatwg-fetch'

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

const loginSuccess = userInfo => ({
  type: LOGIN_SUCCESS,
  payload: userInfo
})

const loginFailure = err => ({
  type: LOGIN_FAILURE,
  payload: err
})

const login = userCredentials => {
  const fetch = window.fetch

  return (dispatch, getState) => {
    // indicate that we are going to lunch the login request
    dispatch(loginRequest())
    // launch the login request
    return fetch(`${serverUrl}/auth/native`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': token
      },
      body: JSON.stringify(userCredentials)
    })
      // receive and parse the data
      .then((resp) => {
        if (resp.status && (resp.status === 200 || resp.status === 201)) return resp
        else throw resp
      })
      .then((resp) => {
        const authToken = resp.headers.get('authorization')
        const respPromise = resp.json()
        // resolve the promise to get the response
        respPromise.then(respObj => {
          const newRespObj = Object.assign({}, respObj, {'authToken': authToken})
          // process the response
          dispatch(loginSuccess(newRespObj))
        })
      })
      .catch((resp) => {
        const respPromise = resp.json()
        respPromise.then(result => {
          let errMessage
          if (result.error === 'User.InvalidPassword') {
            errMessage = 'Oops! That email and password combination is not valid.'
          } else {
            errMessage = 'Something were wrong :('
          }
          dispatch(loginFailure(errMessage))
        })
      })
  }
}

const loginActions = {
  login,
  loginFailure
}

export default loginActions
