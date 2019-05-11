import {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  TOKEN_EXPIRED
} from '../constants/constants'

const initialState = {
  isFecthing: false,
  error: false,
  errorMessage: '',
  eventList: [],
  success: false,
  successMessage: '',
  tokenExpired: false
}

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_REQUEST:
      return Object.assign({}, state, {
        isFecthing: true,
        error: false,
        success: false,
        eventList: [],
        errorMessage: '',
        tokenExpired: false
      })

    case EVENT_SUCCESS:
      return Object.assign({}, state, {
        isFecthing: false,
        success: true,
        eventList: action.payload.response,
        successMessage: action.payload.message
      })

    case EVENT_FAILURE:
      return Object.assign({}, state, {
        isFecthing: false, error: true, errorMessage: action.payload
      })

    case TOKEN_EXPIRED:
      return Object.assign({}, state, {
        tokenExpired: true
      })

    default:
      return state
  }
}

export default eventsReducer
