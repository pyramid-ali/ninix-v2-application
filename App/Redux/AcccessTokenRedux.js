import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

export const INITIAL_STATE = Immutable({
  type: null,
  accessToken: null,
  refreshToken: null,
  expireAt: null
})

const { Types, Creators } = createActions({
  issueToken: ['payload'],
  revokeToken: null
}, {})

export const AppStateTypes = Types

export const issueToken = (state = INITIAL_STATE, action) => {
  console.log(action, 'access token action')
  const { payload } = action
  return {
    ...state,
    ...payload
  }
}

export const revokeToken = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ISSUE_TOKEN]: issueToken,
  [Types.REVOKE_TOKEN]: revokeToken,
})

export default Creators
