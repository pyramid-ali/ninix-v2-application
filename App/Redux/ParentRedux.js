import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  name: null,
  birthDate: null,
  job: null,
  mobile: null,
  bloodGroup: null,
  phone: null,
  email: null,
  image: null,
  sync: false
})

// define types and actions
const { Types, Creators } = createActions({
  updateMother: ['payload'],
  updateFather: ['payload'],
  syncFather: null,
  syncMother: null
}, {
  prefix: 'PARENT_'
})

export const ParentTypes = Types

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


export const motherReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_MOTHER]: update,
  [Types.SYNC_MOTHER]: sync
})

export const fatherReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_FATHER]: update,
  [Types.SYNC_FATHER]: sync
})

export default Creators
