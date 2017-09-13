import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  name: null,
  birthDate: null,
  gender: null,
  image: null,
  progress: null,
  bloodGroup: null,
  changeDate: null,
  sync: true
})

// define types and actions
const { Types, Creators } = createActions({
  update: ['payload'],
  sync: ['payload'],
  updateWithoutSync: ['payload'],
  retrieve: null
}, {
  prefix: 'BABY_'
})

export const BabyTypes = Types

export const update = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    sync: false
  }
}

export const updateWithoutSync = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload
  }
}

export const sync = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    sync: true
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE]: update,
  [Types.SYNC]: sync,
  [Types.UPDATE_WITHOUT_SYNC]: updateWithoutSync,
})


export default Creators
