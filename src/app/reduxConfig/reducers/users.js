import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE

} from '../constants/constants'

const initialState = {
  isFecthing: false,
  error: false,
  errorMessage: '',
  success: false,
  successMessage: '',
  userInfo: ''
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFecthing: true, error: false, success: false, successMessage: false, userInfo: ''
      })

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFecthing: false, success: true, successMessage: action.payload, userInfo: action.payload
      })

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFecthing: false, error: true, errorMessage: action.payload
      })

    default:
      return state
  }
}

export default usersReducer
