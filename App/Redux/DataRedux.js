import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import BluetoothStates from '../Bluetooth/BluetoothState'
import moment from 'moment'

export const INITIAL_STATE = Immutable({
  vitalSigns: []
})

const { Types, Creators } = createActions({
  receiveData: ['data', 'time'],
  removeData: null,
  extractData: ['vitalSign']
}, {
  prefix: 'DATA_'
})

export const DataTypes = Types

export const receiveExtractData = (state = INITIAL_STATE, action) => {
  const { vitalSign } = action

  const fiveMinutesAgo = moment().subtract(5, 'm')
  const filteredData = state.vitalSigns.filter((item, index) => {
      return item.registerAt > fiveMinutesAgo.unix()
  })
  return {
    ...state,
    vitalSigns: [
      ...filteredData,
      vitalSign
    ]
  }
}

export const emptyData = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    data: []
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXTRACT_DATA]: receiveExtractData,
  [Types.REMOVE_DATA]: emptyData,
})


export default Creators
