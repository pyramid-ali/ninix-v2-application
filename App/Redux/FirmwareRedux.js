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
  state: null,
  successfulUpdate: false
})

const { Types, Creators } = createActions({
  checkLatestVersion: null,
  setLatestVersion: ['payload'],
  startUpdate: null,
  update: null,
  dfuProgress: ['payload'],
  dfuStateChange: ['state'],
  didFail: ['error'],
  didUpdateSuccess: null,
  didUpdateFail: ['error'],
  didLeaveUpdate: null
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
  return {
    ...state,
    percent: 0,
    state: 'SENDING_COMMAND',
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

export const didUpdateSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    updating: false,
    percent: null,
    currentPart: null,
    partsTotal: null,
    avgSpeed: null,
    speed: null,
    state: null,
    successfulUpdate: true
  }
}

export const didUpdateFail = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    updating: false,
    percent: null,
    currentPart: null,
    partsTotal: null,
    avgSpeed: null,
    speed: null,
    state: null
  }
}

export const didLeaveUpdate = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    successfulUpdate: false,
    error: false
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECK_LATEST_VERSION]: checkLatestVersion,
  [Types.SET_LATEST_VERSION]: setLatestVersion,
  [Types.START_UPDATE]: startUpdate,
  [Types.DFU_PROGRESS]: dfuProgress,
  [Types.DFU_STATE_CHANGE]: dfuStateChange,
  [Types.DID_FAIL]: didFail,
  [Types.DID_UPDATE_SUCCESS]: didUpdateSuccess,
  [Types.DID_UPDATE_FAIL]: didUpdateFail,
  [Types.DID_LEAVE_UPDATE]: didLeaveUpdate,
})

export default Creators
