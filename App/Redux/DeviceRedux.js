import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'


/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  logs: [],
  latestFirmwareVersion: null,
  localFirmwareVersion: null,
  fetching: false
})

const { Types, Creators } = createActions({
  didDeviceConnect: null,
  didDeviceDisconnect: null,
  setDeviceLogs: ['payload'],
  removeDeviceLogs: null,
  pullDeviceLogs: null,
  pushDeviceLogs: null,
  getLatestFirmwareVersion: ['payload'],
  getLocalFirmwareVersion: ['payload'],
}, {
  prefix: 'device/'
})

export const DeviceTypes = Types

export const connect = (state = INITIAL_STATE, action) => {
  const { log } = state
  const { mac } = action
  return {
    ...state,
    logs: [
      {status: 'connect', created_at: moment().date(), mac}, ...log
    ]
  }
}

export const disconnect = (state = INITIAL_STATE, action) => {
  const { log } = state
  const { mac } = action
  return {
    ...state,
    logs: [
      {status: 'disconnect', created_at: moment().date(), mac}, ...log
    ]
  }
}

export const setDeviceLogs = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const locals = state.logs.filter((log) => {
    return !log.id
  })

  return {
    ...state,
    logs: [...locals, ...payload],
    fetching: false
  }
}

export const removeDeviceLogs = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    logs: []
  }
}

export const pullDeviceLogs = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true
  }
}

export const setState = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_DEVICE_CONNECT]: connect,
  [Types.DID_DEVICE_DISCONNECT]: disconnect,
  [Types.SET_DEVICE_LOGS]: setDeviceLogs,
  [Types.REMOVE_DEVICE_LOGS]: removeDeviceLogs,
  [Types.PULL_DEVICE_LOGS]: pullDeviceLogs,
  [Types.GET_LATEST_FIRMWARE_VERSION]: setState,
})

export default Creators
