import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import _ from 'lodash'

/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  connect: null,
  disconnect: null
})

const { Types, Creators } = createActions({
  didConnect: ['payload'],
  didDisconnect: ['payload'],
  syncConnectLog: ['payload'],
  syncDisconnectLog: ['payload'],
}, {
  prefix: 'deviceLog/'
})

export const DeviceLogTypes = Types

export const didConnect = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const now = moment()
  return {
    ...state,
    connect: {
      ...state.connect,
      [now.unix()]: {
        mac: payload.device.id,
        name: payload.name,
        firmware: payload.firmware,
        revision: payload.revision,
        serial: payload.serial,
        happenedAt: now,
        sync: false
      }
    }
  }
}

export const syncConnectLog = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const connect = _.omit(state.connect, payload)
  return {
    ...state,
    connect
  }
}

export const didDisconnect = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const now = moment()
  return {
    ...state,
    disconnect: {
      ...state.disconnect,
      [now.unix()]: {
        mac: payload.device.id,
        name: payload.name,
        firmware: payload.firmware,
        revision: payload.revision,
        error: payload.error,
        serial: payload.serial,
        happenedAt: now,
        sync: false
      }
    }
  }
}

export const syncDisconnectLog = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const disconnect = _.omit(state.disconnect, payload)
  return {
    ...state,
    disconnect
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_CONNECT]: didConnect,
  [Types.DID_DISCONNECT]: didDisconnect,
  [Types.SYNC_CONNECT_LOG]: syncConnectLog,
  [Types.SYNC_DISCONNECT_LOG]: syncDisconnectLog
})

export default Creators
