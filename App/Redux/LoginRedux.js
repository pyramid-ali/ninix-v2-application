import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  isFetchingUser: false,
  error: null
})

const { Types, Creators } = createActions({
  success: null,
  request: ['mobile', 'password'],
  failure: ['error'],
  logout: null
}, {
  prefix: 'LOGIN'
})

export const LoginTypes = Types

export const success = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    isLoggedIn: true,
    error: null,
    isFetchingUser: false
  }
}

export const request = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isFetchingUser: true,
    error: null
  }
}

export const failure = (state = INITIAL_STATE, action) => {
  console.log(action, 'login failure')
  const { error } = action
  return {
    ...state,
    error,
    isFetchingUser: null
  }
}

export const logout = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUCCESS]: success,
  [Types.REQUEST]: request,
  [Types.FAILURE]: failure,
  [Types.LOGOUT]: logout
  })

export default Creators
