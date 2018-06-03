import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  id: null,
  name: null,
  weight: null,
  height: null,
  head: null,
  gestation: null,
  gender: null,
  birthDate: null,
  number: null,
  error: null,
  lastUpdate: null,
  fetch: false
})

// define types and actions
const { Types, Creators } = createActions({
  getInformation: null,
  saveInformation: ['payload'],
  setInformation: ['payload'],
  didFail: ['error']
}, {
  prefix: 'baby/'
})

export const BabyTypes = Types

export const setInformation = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    error: null,
    fetch: false,
    lastUpdate: moment()
  }
}

export const didFail = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    error,
    lastUpdate: moment()
  }
}

export const saveInformation = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: null,
    fetch: true
  }
}

export const getInformation = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: null,
    fetch: true
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_INFORMATION]: setInformation,
  [Types.GET_INFORMATION]: getInformation,
  [Types.SAVE_INFORMATION]: saveInformation,
  [Types.DID_FAIL]: didFail,
})


export default Creators
