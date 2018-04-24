import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import _ from 'lodash'

export const INITIAL_STATE = Immutable({
  stream: [],
  sync: [],
  temp: [],
  weights: {},
  heights: {},
  heads: {}
})

const { Types, Creators } = createActions({
  didReceiveData: ['data'],
  didReceiveSync: ['data'],
  didSyncEnd: null,
  syncWithServer: null,
  saveTemp: ['data'],
  removeTemp: null,
  addWeight: ['payload'],
  removeWeight: ['payload'],
  addHeight: ['payload'],
  removeHeight: ['payload'],
  addHead: ['payload'],
  removeHead: ['payload']
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
      ...stream.slice(stream.length - 1000, stream.length),
      data
    ]
  }
}

export const didReceiveSync = (state = INITIAL_STATE, action) => {

  const { data } = action
  const { sync } = state
  return {
    ...state,
    sync: [
      ...sync,
      ...data
    ]
  }
}

export const saveTemp = (state = INITIAL_STATE, action) => {
  const { temp } = state
  const { data } =action
  return {
    ...state,
    temp: [
      ...temp,
      data
    ]
  }
}

export const removeTemp = (state = INITIAL_STATE, action) => {

  return {
    ...state,
    temp: []
  }
}

export const didSyncEnd = (state = INITIAL_STATE, action) => {

  const { sync, temp } = state
  return {
    ...state,
    sync: [],
    temp: [
      ...sync,
      ...temp
    ]
  }
}

export const addWeight = (state = INITIAL_STATE, action) => {

  const { payload } = action
  const today = moment().format('YYYY-MM-DD')
  return {
    ...state,
    weights: {
      ...state.weights,
      [today]: {value: payload, date: today, sync: false}
    }
  }
}

export const removeWeight = (state = INITIAL_STATE, action) => {

  const date = action.payload || moment().format('YYYY-MM-DD')

  return {
    ...state,
    weights: {
      ..._.omit(state.weights, date)
    }
  }
}

export const addHeight = (state = INITIAL_STATE, action) => {

  const { payload } = action
  const today = moment().format('YYYY-MM-DD')
  return {
    ...state,
    heights: {
      ...state.heights,
      [today]: {value: payload, date: today, sync: false}
    }
  }
}

export const removeHeight = (state = INITIAL_STATE, action) => {

  const date = action.payload || moment().format('YYYY-MM-DD')

  return {
    ...state,
    weights: {
      ..._.omit(state.heights, date)
    }
  }
}

export const addHead = (state = INITIAL_STATE, action) => {

  const { payload } = action
  const today = moment().format('YYYY-MM-DD')
  return {
    ...state,
    heads: {
      ...state.heads,
      [today]: {value: payload, date: today, sync: false}
    }
  }
}

export const removeHead = (state = INITIAL_STATE, action) => {

  const date = action.payload || moment().format('YYYY-MM-DD')

  return {
    ...state,
    weights: {
      ..._.omit(state.heads, date)
    }
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_RECEIVE_DATA]: didReceiveData,
  [Types.DID_RECEIVE_SYNC]: didReceiveSync,
  [Types.SAVE_TEMP]: saveTemp,
  [Types.REMOVE_TEMP]: removeTemp,
  [Types.DID_SYNC_END]: didSyncEnd,
  [Types.ADD_WEIGHT]: addWeight,
  [Types.REMOVE_WEIGHT]: removeWeight,
  [Types.ADD_HEIGHT]: addHeight,
  [Types.REMOVE_HEIGHT]: removeHeight,
  [Types.ADD_HEAD]: addHead,
  [Types.REMOVE_HEAD]: removeHead
})

export default Creators
