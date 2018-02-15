import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import BluetoothStates from '../Bluetooth/BluetoothState'

export const INITIAL_STATE = Immutable({
  state: BluetoothStates.unknown,
  devices: [],
  isConnected: false,
  isConnecting: false,
  isScanning: false,
  error: null
})

const { Types, Creators } = createActions({

  startScan: null,
  stopScan: null,
  cancelConnection: null,
  didDiscover: ['devices'],
  didStateChange: ['status'],
  connect: ['device'],
  didConnect: null,
  disconnect: null,
  didDisconnect: null,
  didFail: ['error']

}, {
  prefix: 'bluetooth/'
})

export const BluetoothTypes = Types

export const didStateChange = (state = INITIAL_STATE, action) => {
  const { status } = action
  return {
    ...state,
    state: status
  }
}

export const startScan = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: null,
    isScanning: true
  }
}

export const stopScan = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isScanning: false,
    devices: [],
  }
}

export const cancel = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnected: false,
    isConnecting: false,
  }
}

export const didDiscover = (state = INITIAL_STATE, action) => {
  const { devices } = action
  return {
    ...state,
    devices
  }
}

export const connect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnecting: true,
    error: null
  }
}

export const didConnect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    devices: [],
    isConnected: true,
    isConnecting: false,
    isScanning: false
  }
}

export const didDisconnect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnected: false
  }
}

export const didFail = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    isConnecting: false,
    error,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_SCAN]: startScan,
  [Types.STOP_SCAN]: stopScan,
  [Types.CONNECT]: connect,
  [Types.DID_CONNECT]: didConnect,
  [Types.DID_DISCONNECT]: didDisconnect,
  [Types.CANCEL_CONNECTION]: cancel,
  [Types.DID_STATE_CHANGE]: didStateChange,
  [Types.DID_DISCOVER]: didDiscover,
  [Types.DID_FAIL]: didFail,
})


export default Creators
