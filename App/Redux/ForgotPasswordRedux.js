import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
});

// define types and actions
const { Types, Creators } = createActions(
  {
    requestToken: ['mobile', 'callback'],
    checkToken: ['mobile', 'token', 'callback'],
    changePassword: ['mobile', 'token', 'password'],
    didRequestSuccess: null,
    didRequestFail: ['error'],
    cancel: null,
  },
  {
    prefix: 'forgotPassword/',
  }
);

export const ForgotPasswordTypes = Types;

const requestToken = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true,
    error: null,
  };
};

const checkToken = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true,
    error: null,
  };
};

const changePassword = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: true,
    error: null,
  };
};

const didRequestSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetching: false,
    error: null,
  };
};

const didRequestFail = (state = INITIAL_STATE, action) => {
  const { error } = action;
  return {
    ...state,
    fetching: false,
    error,
  };
};

const cancel = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_TOKEN]: requestToken,
  [Types.CHECK_TOKEN]: checkToken,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.DID_REQUEST_SUCCESS]: didRequestSuccess,
  [Types.DID_REQUEST_FAIL]: didRequestFail,
  [Types.CANCEL]: cancel,
});

export default Creators;
