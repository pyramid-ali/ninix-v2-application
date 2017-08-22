import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import BluetoothStates from '../Bluetooth/BluetoothState'
import moment from 'moment'

export const INITIAL_STATE = Immutable({
  data: []
})

const { Types, Creators } = createActions({
  receiveData: ['data', 'time'],
  removeData: null
}, {
  prefix: 'DATA_'
})

export const DataTypes = Types

export const receiveData = (state = INITIAL_STATE, action) => {
  const { data, time } = action
  const fiveMinuteAgo = moment().subtract(5, 'm')
  const filteredData = state.data.filter((item, index) => {
      return item.time > fiveMinuteAgo.unix()
  })
  return {
    ...state,
    data: [
      ...filteredData,
      {data, time}
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
  [Types.RECEIVE_DATA]: receiveData,
  [Types.REMOVE_DATA]: emptyData,
})


export default Creators
