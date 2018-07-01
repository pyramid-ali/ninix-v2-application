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
  error: null,
  updating: false,
  percent: null,
  currentPart: null,
  partsTotal: null,
  avgSpeed: null,
  speed: null,
  state: null
})

const { Types, Creators } = createActions({
  checkLatestVersion: null,
  setLatestVersion: ['payload'],
  startUpdate: null,
  dfuProgress: ['payload'],
  dfuStateChange: ['state'],
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

export const startUpdate = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    error,
    updating: true
  }
}

export const dfuProgress = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload
  }
}

export const dfuStateChange = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    state: action.state
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECK_LATEST_VERSION]: checkLatestVersion,
  [Types.SET_LATEST_VERSION]: setLatestVersion,
  [Types.START_UPDATE]: startUpdate,
  [Types.DFU_PROGRESS]: dfuProgress,
  [Types.DFU_STATE_CHANGE]: dfuStateChange,
  [Types.DID_FAIL]: didFail,
})

export default Creators
