import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import _ from 'lodash'

/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  name: null,
  version: null,
  description: null,
  path: null,
  fetch: false,
  error: null
})

const { Types, Creators } = createActions({
  checkLatestVersion: null,
  setLatestVersion: ['payload'],
  didFail: ['error']
}, {
  prefix: 'firmware/'
})

export const FirmwareTypes = Types

export const checkLatestVersion = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetch: true,
    error: null
  }
}

export const setLatestVersion = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    fetch: false,
    error: null
  }
}

export const didFail = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    error,
    fetch: false
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECK_LATEST_VERSION]: checkLatestVersion,
  [Types.SET_LATEST_VERSION]: setLatestVersion,
  [Types.DID_FAIL]: didFail,
})

export default Creators
