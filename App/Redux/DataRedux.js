import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import BluetoothStates from '../Bluetooth/BluetoothState'
import moment from 'moment'

export const INITIAL_STATE = Immutable({
  vitalSigns: [],
  unSynced: [],
  syncing: false
})

const { Types, Creators } = createActions({
  receiveData: ['data', 'time'],
  extractData: ['vitalSign'],
  receiveUnsyncData: ['vitalSign'],
  syncData: ['vitalSign'],
  syncing: null,
  finishSyncing: null
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

export const addUnsyncData = (state = INITIAL_STATE, action) => {
  console.log('addUnsyncData')
  const { vitalSign } = action
  const filteredData = state.unSynced.filter((item) => {
    return item.registerAt !== vitalSign.registerAt
  })
  return {
    ...state,
    unSynced: [
      ...filteredData,
      vitalSign
    ]
  }
}

export const syncData = (state = INITIAL_STATE, action) => {
  const { vitalSign } = action
  const filteredData = state.unSynced.filter((item) => {
    return item.registerAt !== vitalSign.registerAt
  })
  return {
    ...state,
    unSynced: [
      ...filteredData
    ]
  }
}

export const syncing = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    syncing: true
  }
}

export const finishSyncing = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    syncing: false
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXTRACT_DATA]: receiveExtractData,
  [Types.RECEIVE_UNSYNC_DATA]: addUnsyncData,
  [Types.SYNC_DATA]: syncData,
  [Types.SYNCING]: syncing,
  [Types.FINISH_SYNCING]: finishSyncing
})


export default Creators
