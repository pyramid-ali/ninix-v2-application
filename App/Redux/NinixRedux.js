import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

export const INITIAL_STATE = Immutable({
  device: null,
  battery: null
})

const { Types, Creators } = createActions({

  updateBattery: ['battery'],
  setDevice: ['device']
}, {
  prefix: 'ninix/'
})

export const NinixTypes = Types

export const updateBattery = (state = INITIAL_STATE, action) => {
  const { battery } = action
  return {
    ...state,
    battery
  }
}

export const setDevice = (state = INITIAL_STATE, action) => {
  const { device } = action
  return {
    ...state,
    device
  }
}


export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_BATTERY]: updateBattery,
  [Types.SET_DEVICE]: setDevice
})


export default Creators
