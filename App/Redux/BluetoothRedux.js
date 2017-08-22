import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import BluetoothStates from '../Bluetooth/BluetoothState'

export const INITIAL_STATE = Immutable({
  state: BluetoothStates.unknown,
  isConnected: false,
  isSyncing: false,
  isScanning: false,
  isConnecting: false,
  devices: [],
  connectedDevice: null
})

const { Types, Creators } = createActions({
  changeState: ['status'],
  startScan: null,
  stopScan: null,
  addDevice: ['device'],
  changeConnectivity: ['status'],
  setSyncingStatus: ['status'],
  startConnecting: ['device'],
  cancelConnection: null,
  successConnect: ['device'],
  disconnect: null
}, {
  prefix: 'BLUETOOTH_'
})

export const BluetoothTypes = Types

export const changeState = (state = INITIAL_STATE, action) => {
  const { status } = action
  return {
    ...state,
    state: status
  }
}

export const changeConnectivity = (state = INITIAL_STATE, action) => {
  const { status } = action
  return {
    ...state,
    isConnected: status
  }
}

export const setSyncingStatus = (state = INITIAL_STATE, action) => {
  const { status } = action
  return {
    ...state,
    isSyncing: status
  }
}

export const startScan = (state = INITIAL_STATE, action) => {
  const { status } = action
  return {
    ...state,
    isScanning: true
  }
}

export const stopScan = (state = INITIAL_STATE, action) => {
  const { status } = action
  return {
    ...state,
    isScanning: false,
    devices: [],
  }
}

export const addDevice = (state = INITIAL_STATE, action) => {
  const { device } = action
  const found = state.devices.find((item) => {
    return item.id === device.id
  })
  if (found === undefined) {
    return {
      ...state,
      devices: [...state.devices, { id: device.id, device}]
    }
  }
  return state
}

export const startConnecting = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnecting: true
  }
}

export const cancelConnection = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnecting: false,
  }
}

export const successConnect = (state = INITIAL_STATE, action) => {
  const { device } = action
  return {
    ...state,
    connectedDevice: device,
    isConnected: true,
    isScanning: false,
    isConnecting: false,
    devices: []
  }
}

export const disconnect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnected: false,
    isSyncing: false,
    isScanning: false,
    isConnecting: false,
    devices: [],
    connectedDevice: null
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATE]: changeState,
  [Types.CHANGE_CONNECTIVITY]: changeConnectivity,
  [Types.SET_SYNCING_STATUS]: setSyncingStatus,
  [Types.START_SCAN]: startScan,
  [Types.STOP_SCAN]: stopScan,
  [Types.ADD_DEVICE]: addDevice,
  [Types.START_CONNECTING]: startConnecting,
  [Types.CANCEL_CONNECTION]: cancelConnection,
  [Types.SUCCESS_CONNECT]: successConnect,
  [Types.DISCONNECT]: disconnect
})


export default Creators
