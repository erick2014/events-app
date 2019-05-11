import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../constants/constants'

import {serverUrl, token} from '../../../../env'
import 'whatwg-fetch'

const signUpRequest = () => {
  return {
    type: SIGNUP_REQUEST
  }
}

const signUpSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: data
})

const signUpFailure = err => ({
  type: SIGNUP_FAILURE,
  payload: err
})

const signUp = userInfo => {
  const fetch = window.fetch

  return (dispatch, getState) => {
    // indicate that we are going to lunch the login request
    dispatch(signUpRequest())
    // launch the login request
    return fetch(`${serverUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': token
      },
      body: JSON.stringify(userInfo)
    })
      // receive and parse the data
      .then((resp) => {
        if (resp.status && (resp.status === 200 || resp.status === 201)) return resp
        else throw resp
      })
      .then((resp) => {
        // process the response
        dispatch(signUpSuccess('User has been created'))
      })
      .catch((resp) => {
        const respPromise = resp.json()

        respPromise.then(result => {
          let errMessage
          if (result.error && result.error === 'User.Exists') {
            errMessage = 'The user already exists'
          } else {
            errMessage = 'Something were wrong :('
          }
          dispatch(signUpFailure(errMessage))
        })
      })
  }
}

const signUpActions = {
  signUp,
  signUpFailure
}

export default signUpActions
