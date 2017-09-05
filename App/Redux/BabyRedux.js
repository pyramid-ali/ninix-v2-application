import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  name: null,
  birthDate: null,
  weight: null,
  height: null,
  head: null,
  image: null,
  sync: false
})

// define types and actions
const { Types, Creators } = createActions({
  update: ['payload'],
  sync: null
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

export const sync = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    sync: true
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE]: update,
  [Types.SYNC]: sync
})


export default Creators
