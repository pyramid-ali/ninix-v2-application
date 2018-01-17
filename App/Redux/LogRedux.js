import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'


/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  device: [],
  fetching: false
})

const { Types, Creators } = createActions({
  didDeviceConnect: null,
  didDeviceDisconnect: null,
  setDeviceLogs: ['payload'],
  removeDeviceLogs: null,
  pullDeviceLogs: null,
  pushDeviceLogs: null
}, {
  prefix: 'LOGIN_'
})

export const LogTypes = Types

export const connect = (state = INITIAL_STATE, action) => {
  const { device } = state
  const { mac } = action
  return {
    ...state,
    device: [
      {status: 'connect', created_at: moment().date(), mac}, ...device
    ]
  }
}

export const disconnect = (state = INITIAL_STATE, action) => {
  const { device } = state
  const { mac } = action
  return {
    ...state,
    device: [
      {status: 'disconnect', created_at: moment().date(), mac}, ...device
    ]
  }
}

export const setDeviceLogs = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const locals = state.device.filter((log) => {
    return !log.id
  })

  return {
    ...state,
    device: [...locals, ...payload],
    fetching: false
  }
}

export const removeDeviceLogs = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    device: []
  }
}

export const pullDeviceLogs = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_DEVICE_CONNECT]: connect,
  [Types.DID_DEVICE_DISCONNECT]: disconnect,
  [Types.SET_DEVICE_LOGS]: setDeviceLogs,
  [Types.REMOVE_DEVICE_LOGS]: removeDeviceLogs,
  [Types.PULL_DEVICE_LOGS]: pullDeviceLogs
})

export default Creators
