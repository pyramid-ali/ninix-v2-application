import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'


/***
 * Initial state of authentication redux
 */
export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  loggedInAt: null,
  loggedOutAt: null,
  fetching: false,
  error: null
})

/***
 * create actions
 */
const { Types, Creators } = createActions({
  loggedIn: null,
  loggedOut: null,
  changePassword: ['newPassword', 'oldPassword', 'onSuccess', 'onFail'],
  failure: ['error'],
  success: null,
  end: null
}, {
  prefix: 'AUTHENTICATION_'
})

export const UserTypes = Types

export const loggedIn = (state = INITIAL_STATE, action) => {

  return {
    ...state,
    isLoggedIn: true,
    loggedInAt: moment()
  }

}

export const loggedOut = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoggedIn: false,
    loggedOutAt: moment()
  }
}

export const changePassword = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true
  }
}

export const failure = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    fetching: false,
    error
  }
}

export const end = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: false
  }
}

/***
 * create reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGGED_IN]: loggedIn,
  [Types.LOGGED_OUT]: loggedOut,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.END]: end,
})

export default Creators
