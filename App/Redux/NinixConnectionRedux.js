import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import _ from 'lodash'

/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  logs: {}
})

const { Types, Creators } = createActions({
  didConnect: ['payload'],
  didDisconnect: ['payload'],
  syncWithServer: null,
  didSyncWithServer: ['payload'],
}, {
  prefix: 'ninixConnection/'
})

export const NinixConnectionTypes = Types

export const didConnect = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const now = moment()
  return {
    ...state,
    logs: {
      ...state.logs,
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
    logs: {
      ...state.logs,
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

export const didSyncWithServer = (state = INITIAL_STATE, action) => {
  const { payload } = action
  const logs = _.omit(state.logs, payload)
  return {
    ...state,
    logs: {
      ...logs
    }
  }
}



export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_CONNECT]: didConnect,
  [Types.DID_DISCONNECT]: didDisconnect,
  [Types.DID_SYNC_WITH_SERVER]: didSyncWithServer
})

export default Creators
