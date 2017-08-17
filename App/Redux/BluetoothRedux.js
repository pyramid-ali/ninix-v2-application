import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import BluetoothStates from '../Bluetooth/BluetoothState'

export const INITIAL_STATE = Immutable({
  state: BluetoothStates.unknown,
  isConnected: false,
  isSyncing: false,
})

const { Types, Creators } = createActions({
  changeState: ['status'],
  changeConnectivity: ['status'],
  setSyncingStatus: ['status']
}, {
  prefix: 'BLUETOOTH_'
})

export const BluetoothTypes = Types

export const changeState = (state = INITIAL_STATE, action) => {
  console.log(action, 'access token action')
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

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATE]: changeState,
  [Types.CHANGE_CONNECTIVITY]: changeConnectivity,
  [Types.SET_SYNCING_STATUS]: setSyncingStatus,
})

export default Creators
