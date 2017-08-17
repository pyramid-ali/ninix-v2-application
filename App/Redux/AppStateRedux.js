import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

export const INITIAL_STATE = Immutable({
  didIntroduce: false
})

const { Types, Creators } = createActions({
  introduceApp: null
}, {})

export const AppStateTypes = Types

export const introduce = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    didIntroduce: true
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INTRODUCE_APP]: introduce
})

export const AppState = Creators
