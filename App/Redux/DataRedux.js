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

  const upperTimeThreshold = moment().subtract(30, 's')
  const lowerTimeThreshold = moment().subtract(60, 'm')
  const filteredData = state.vitalSigns.filter((item, index) => {

    if (moment(item.registerAt).unix() < lowerTimeThreshold.unix()) {
      return false
    }

    if (moment(item.registerAt).unix() > upperTimeThreshold.unix()) {
      return true
    }

    if (state.vitalSigns.length > index + 1) {
      if (isEqual(state.vitalSigns[index], state.vitalSigns[index + 1])) {
        return false
      } else {
        return true
      }
    }

    return false
  })
  return {
    ...state,
    vitalSigns: [
      ...filteredData,
      vitalSign
    ]
  }
}

function isEqual(left, right) {
  return left.temperature === right.temperature &&
          left.respiratory === right.respiratory
}

export const addUnsyncData = (state = INITIAL_STATE, action) => {

  const { vitalSign } = action
  // const filteredData = state.unSynced.filter((item) => {
  //   return item.registerAt !== vitalSign.registerAt
  // })
  return {
    ...state,
    // unSynced: [
    //   ...filteredData,
    //   vitalSign
    // ]
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
