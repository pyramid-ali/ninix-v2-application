import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import moment from 'moment'

/***
 * Initial state of login redux
 */
export const INITIAL_STATE = Immutable({
  device: null,
  name: null,
  firmware: null,
  revision: null,
  serial: null
})

const { Types, Creators } = createActions({
  setName: ['payload'],
  setFirmware: ['payload'],
  setRevision: ['payload'],
  setSerial: ['payload'],
  setDevice: ['payload']
}, {
  prefix: 'device/'
})

export const DeviceTypes = Types

export const setName = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    name: payload
  }
}

export const setFirmware = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    firmware: payload
  }
}

export const setRevision = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    revision: payload
  }
}

export const setSerial = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    serial: payload
  }
}

export const setDevice = (state = INITIAL_STATE, action) => {
  const { payload } = action
  return {
    ...state,
    device: payload
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NAME]: setName,
  [Types.SET_FIRMWARE]: setFirmware,
  [Types.SET_REVISION]: setRevision,
  [Types.SET_DEVICE]: setDevice,
})

export default Creators
