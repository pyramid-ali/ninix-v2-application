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
  changeMotherInformation: ['payload'],
  changeFatherInformation: ['payload'],
  setMotherInformation: ['payload'],
  setFatherInformation: ['payload'],
  setMotherImage: ['payload'],
  setFatherImage: ['payload'],
  getFatherInformation: null,
  getMotherInformation: null,
  retrieveMother: null,
  saveMotherInformation: ['onSuccess', 'onFailure'],
  saveFatherInformation: ['onSuccess', 'onFailure']
}, {
  prefix: 'parent/'
})

export const ParentTypes = Types

export const changeInformation = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    sync: false
  }
}

export const setInformation = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload,
    updatedAt: moment(),
    sync: true
  }
}

export const setImage = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    image: payload.image,
    progress: 1,
  }
}

export const motherReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_MOTHER_INFORMATION]: changeInformation,
  [Types.SET_MOTHER_INFORMATION]: setInformation,
  [Types.SET_MOTHER_IMAGE]: setImage,
})

export const fatherReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_FATHER_INFORMATION]: changeInformation,
  [Types.SET_FATHER_INFORMATION]: setInformation,
  [Types.SET_FATHER_IMAGE]: setImage,
})

export default Creators
