import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  start: false,
  isCheckingMobile: false,
  mobile: null,
  isCheckingActivationCode: false,
  activationCode: null,
  isCheckingPassword: false,
  error: null
})

// define types and actions
const { Types, Creators } = createActions({
  start: ['navigation'],
  checkingMobile: ['mobile', 'navigation'],
  mobileVerified: ['mobile'],
  checkingActivationCode: ['mobile', 'code', 'navigation'],
  ActivationCodeVerified: ['code'],
  checkingPassword: ['password'],
  cancel: null,
  wrongNumber: ['navigation'],
  finish: null,
  failure: ['error']
}, {
  prefix: 'SIGNUP_'
})

export const SignupTypes = Types

export const start = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    start: true
  }
}

export const checkMobile = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isCheckingMobile: true
  }
}

export const didMobileVerify = (state = INITIAL_STATE, action) => {
  const { mobile } = action
  return {
    ...state,
    isCheckingMobile: false,
    error: null,
    mobile
  }
}

export const checkActivationCode = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isCheckingActivationCode: true,
    error: null
  }
}

export const didActivationCodeVerify = (state = INITIAL_STATE, action) => {
  const { code } = action
  return {
    ...state,
    activationCode: code,
    isCheckingActivationCode: false
  }
}

export const checkPassword = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isCheckingPassword: true
  }
}

export const cancel = (state = INITIAL_STATE, action) => {
  console.log('cancel')
  return INITIAL_STATE
}

export const wrongNumber = cancel

export const error = (state = INITIAL_STATE, action) => {
  const { error } = action
  return {
    ...state,
    isCheckingMobile: false,
    isCheckingActivationCode: false,
    isCheckingPassword: false,
    error
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START]: start,
  [Types.CHECKING_MOBILE]: checkMobile,
  [Types.MOBILE_VERIFIED]: didMobileVerify,
  [Types.CHECKING_ACTIVATION_CODE]: checkActivationCode,
  [Types.ACTIVATION_CODE_VERIFIED]: didActivationCodeVerify,
  [Types.CHECKING_PASSWORD]: checkPassword,
  [Types.CANCEL]: cancel,
  [Types.WRONG_NUMBER]: cancel,
  [Types.FINISH]: cancel,
  [Types.FAILURE]: error

})

export default Creators
