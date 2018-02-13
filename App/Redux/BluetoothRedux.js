import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import BluetoothStates from '../Bluetooth/BluetoothState'

export const INITIAL_STATE = Immutable({
  state: BluetoothStates.unknown,
  devices: [],
  isConnected: false,
  isConnecting: false,
  isScanning: false
})

const { Types, Creators } = createActions({

  scan: null,
  stopScan: null,
  cancel: null,
  addScannedDevices: ['devices'],
  addDevice: ['device'],
  didStateChange: ['status'],
  didDeviceDiscover: ['device'],
  connect: ['device'],
  didConnect: null,
  disconnect: null,

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

export const scan = (state = INITIAL_STATE, action) => {
  return {
    ...state,
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

export const addScannedDevices = (state = INITIAL_STATE, action) => {
  const { devices } = action
  return {
    ...state,
    devices
  }
}

export const addDevice = (state = INITIAL_STATE, action) => {
  const { device } = action
  const devices = state.devices.filter((d) => {
    return d.id !== device.id
  })
  return {
    ...state,
    devices: [...devices, device]
  }
}

export const didDeviceDiscover = (state = INITIAL_STATE, action) => {
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

export const connect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnecting: true
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

export const disconnect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnected: false,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SCAN]: scan,
  [Types.CONNECT]: connect,
  [Types.CANCEL]: cancel,
  [Types.STOP_SCAN]: stopScan,
  [Types.ADD_DEVICE]: addDevice,
  [Types.DID_STATE_CHANGE]: didStateChange,
  [Types.DID_DEVICE_DISCOVER]: didDeviceDiscover,
  [Types.DID_CONNECT]: didConnect,
  [Types.DISCONNECT]: disconnect,
  [Types.ADD_SCANNED_DEVICES]: addScannedDevices,
})


export default Creators
