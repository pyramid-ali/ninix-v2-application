import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

export const INITIAL_STATE = Immutable({
  state: null,
  isConnected: false,
  isIntroduced: false
})

const { Types, Creators } = createActions({
  init: [null],
  sync: [null],
  didConnectivityChange: ['payload'],
  didStateChange: ['payload'],
  didAppIntroduce: [null]
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
    isIntroduced: true
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_CONNECTIVITY_CHANGE]: connectivityChanged,
  [Types.DID_STATE_CHANGE]: stateChanged,
  [Types.DID_APP_INTRODUCE]: AppIntroduced
})

export default Creators
