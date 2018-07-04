import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
// TODO: we can move battery info here
/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  device: null,
  name: null,
  firmware: null,
  revision: null,
  serial: null,
  battery: 0,
  fullCharge: false,
  charging: false,
  lowBattery: false,
  fetch: false
})

const { Types, Creators } = createActions({
  getInformation: ['payload'],
  setInformation: ['payload'],
  updateBattery: ['payload'],
}, {
  prefix: 'ninix/'
})

export const NinixTypes = Types

export const getInformation = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetch: true
  }
}

export const setInformation = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ..._.pick(payload, ['device', 'name', 'firmware', 'revision', 'serial']),
    fetch: false
  }
}

export const updateBattery = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    ..._.pick(payload, ['battery', 'fullCharge', 'charging', 'lowBattery'])
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_INFORMATION]: getInformation,
  [Types.SET_INFORMATION]: setInformation,
  [Types.UPDATE_BATTERY]: updateBattery,
})

export default Creators
