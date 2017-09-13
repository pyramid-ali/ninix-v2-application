import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

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
  progress: null,
  sync: true,
  updatedAt: null
})

// define types and actions
const { Types, Creators } = createActions({
  updateMother: ['payload'],
  updateFather: ['payload'],
  updateFatherWithoutSync: ['payload'],
  updateMotherWithoutSync: ['payload'],
  syncFather: ['payload'],
  syncMother: ['payload'],
  retrieveFather: null,
  retrieveMother: null
}, {
  prefix: 'PARENT_'
})

export const ParentTypes = Types

export const update = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    updatedAt: moment(),
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
  const { payload } = action
  return {
    ...state,
    ...payload,
    sync: true
  }
}


export const motherReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_MOTHER]: update,
  [Types.UPDATE_MOTHER_WITHOUT_SYNC]: updateWithoutSync,
  [Types.SYNC_MOTHER]: sync,
})

export const fatherReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_FATHER]: update,
  [Types.UPDATE_FATHER_WITHOUT_SYNC]: updateWithoutSync,
  [Types.SYNC_FATHER]: sync
})

export default Creators
