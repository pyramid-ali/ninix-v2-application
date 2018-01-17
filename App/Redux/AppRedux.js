import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {didAppIntroduce} from '../Sagas/AppStateSaga';

export const INITIAL_STATE = Immutable({
  state: null,
  isConnected: false,
  isIntroduced: false
})

const { Types, Creators } = createActions({
  init: [null],
  sync: [null],
  connectivityChanged: ['payload'],
  stateChanged: ['payload'],
  appIntroduced: [null]
}, {
  prefix: 'app/'
})

export const AppTypes = Types

export const connectivityChanged = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnected: action.payload
  }
}

export const stateChanged = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    state: action.payload
  }
}

export const AppIntroduced = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    appIntroduced: true
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONNECTIVITY_CHANGED]: connectivityChanged,
  [Types.STATE_CHANGED]: stateChanged,
  [Types.APP_INTRODUCED]: AppIntroduced
})

export default Creators
