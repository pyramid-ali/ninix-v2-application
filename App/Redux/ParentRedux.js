import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  name: null,
  birthDate: null,
  job: null,
  mobile: null,
  bloodType: null,
  phone: null,
  email: null
})

// define types and actions
const { Types, Creators } = createActions({
  updateMother: ['payload'],
  updateFather: ['payload']
}, {
  prefix: 'PARENT_'
})

export const ParentTypes = Types

export const update = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ...payload
  }
}


export const motherReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_MOTHER]: update
})

export const fatherReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_FATHER]: update
})

export default Creators
