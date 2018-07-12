import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import _ from 'lodash'

/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  connections: {},
  errors: {}
})

const { Types, Creators } = createActions({
  didConnect: ['payload'],
  didDisconnect: ['payload'],
  saveError: ['payload'],
  syncWithServer: null,
  didSyncConnections: ['payload'],
  didSyncErrorLogs: ['payload']
}, {
  prefix: 'ninixLog/'
})

export const NinixLogTypes = Types

export const didConnect = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const now = moment()
  return {
    ...state,
    connections: {
      ...state.connections,
      [now.unix()]: {
        type: 'connect',
        mac: payload.device.id,
        name: payload.name,
        firmware: payload.firmware,
        revision: payload.revision,
        serial: payload.serial,
        happenedAt: now
      }
    }
  }
}

export const didDisconnect = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const now = moment()
  return {
    ...state,
    connections: {
      ...state.connections,
      [now.unix()]: {
        type: 'disconnect',
        mac: payload.device.id,
        name: payload.name,
        firmware: payload.firmware,
        revision: payload.revision,
        serial: payload.serial,
        happenedAt: now
      }
    }
  }
}

export const didSyncConnections = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const connections = _.omit(state.connections, payload)
  return {
    ...state,
    connections: {
      ...connections
    }
  }
}

export const didSyncErrorLogs = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const errors = _.omit(state.errors, payload)
  return {
    ...state,
    errors: {
      ...errors
    }
  }
}

export const saveError = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const now = moment()
  return {
    ...state,
    errors: {
      ...state.errors,
      [moment().now]: {
        body: payload.body,
        serial: payload.serial,
        registerAt: now
      }
    }
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_CONNECT]: didConnect,
  [Types.DID_DISCONNECT]: didDisconnect,
  [Types.SAVE_ERROR]: saveError,
  [Types.DID_SYNC_CONNECTIONS]: didSyncConnections,
  [Types.DID_SYNC_ERROR_LOGS]: didSyncErrorLogs,
})

export default Creators
