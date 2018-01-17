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
  changeInformation: ['payload'],
  setInformation: ['payload'],
  saveInformation: ['payload'],
  getInformation: null,
  setImage: ['payload'],

}, {
  prefix: 'baby/'
})

export const BabyTypes = Types

export const change = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    sync: false
  }
}

export const set = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    sync: true
  }
}

export const setImage = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    progress: 1
  }
}



export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_INFORMATION]: change,
  [Types.SET_INFORMATION]: set,
  [Types.SET_IMAGE]: setImage,

})


export default Creators
