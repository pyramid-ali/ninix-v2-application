import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'


/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  tries: 0
})

/***
 * actions:
 * request: when user press login button
 * success: when server response ok with token properties
 * failure: when an error occurred to get user token properties
 */
const { Types, Creators } = createActions({
  request: ['mobile', 'password'],
  success: null,
  failure: ['error']
}, {
  prefix: 'login/'
})

export const LoginTypes = Types

/***
 *
 * @param state
 * @param action
 * @returns {{fetching: boolean, error: null, tries: number}}
 */
export const request = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true,
    error: null,
    tries: state.tries++
  }
}

/***
 *
 * @param state
 * @param action
 * @returns {{fetching: boolean, error: boolean}}
 */
export const success = (state = INITIAL_STATE, action) => {

  return {
    ...state,
    fetching: false,
    error: null
  }
}


/***
 *
 * @param state
 * @param action
 * @returns {{error: *, fetching: boolean}}
 */
export const failure = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    error,
    fetching: false
  }
}

/***
 * create reducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUCCESS]: success,
  [Types.REQUEST]: request,
  [Types.FAILURE]: failure,
})

export default Creators
