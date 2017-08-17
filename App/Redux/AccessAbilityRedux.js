import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

export const INITIAL_STATE = Immutable({
  wifiOn: false,
  cellularOn: false,
  bluetoothOn: false,
  isConnected: false
})

const { Types, Creators } = createActions({
  networkStatus: ['status'],
  networkConnectivity: ['status']
}, {
  prefix: 'ACCESS_ABILITY_'
})

export const AccessAbilityTypes = Types

export const changeNetworkStatus = (state = INITIAL_STATE, action) => {
  const { status } = action
  switch (status) {
    case 'WIFI':
    case 'wifi':
      return {
        ...state,
        wifiOn: true
      }
    case 'cell':
    case 'MOBILE':
      return {
        ...state,
        cellularOn: true
      }
    default:
      return INITIAL_STATE
  }
}

export const changeNetworkConnectivity = (state = INITIAL_STATE, action) => {
  const { status } = action
  return {
    ...state,
    isConnected: status
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NETWORK_STATUS]: changeNetworkStatus,
  [Types.NETWORK_CONNECTIVITY]: changeNetworkConnectivity,
})

export default Creators
