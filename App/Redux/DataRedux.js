import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import BluetoothStates from '../Bluetooth/BluetoothState'
import moment from 'moment'

export const INITIAL_STATE = Immutable({
  stream: [],
  sync: []
})

const { Types, Creators } = createActions({
  didReceiveData: ['data'],
  didReceiveSync: ['data']
}, {
  prefix: 'data/'
})

export const DataTypes = Types

export const didReceiveData = (state = INITIAL_STATE, action) => {

  const { stream } = state
  const { data } = action
  return {
    ...state,
    stream: [
      ...stream,
      data
    ]
  }
}

export const didReceiveSync = (state = INITIAL_STATE, action) => {

  const { sync } = state
  const { data } = action
  return {
    ...state,
    sync: [
      ...sync,
      data
    ]
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_RECEIVE_DATA]: didReceiveData,
  [Types.DID_RECEIVE_SYNC]: didReceiveSync,
})

export default Creators
