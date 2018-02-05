import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  mobile: null
})

// define types and actions
const { Types, Creators } = createActions({
  requestToken: ['mobile', 'callback'],
  successTokenRequest: ['mobile'],
  checkToken: ['token', 'callback'],
  success: null,
  failure: ['error'],
  cancel: null
}, {
  prefix: 'SIGNUP_'
})

export const SignupTypes = Types

const requestToken = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true,
    error: null
  }
}

const successTokenRequest = (state = INITIAL_STATE, action) => {
  const { mobile } = action
  return {
    ...state,
    mobile,
    fetching: false,
    error: null
  }
}

const checkToken = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true,
    error: null
  }
}

const success = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: false,
    error: null
  }
}


const failure = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    fetching: false,
    error
  }
}

const cancel = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_TOKEN]:         requestToken,
  [Types.SUCCESS_TOKEN_REQUEST]: successTokenRequest,
  [Types.CHECK_TOKEN]:           checkToken,
  [Types.SUCCESS]:               success,
  [Types.FAILURE]:               failure,
  [Types.CANCEL]:                cancel
})

export default Creators
