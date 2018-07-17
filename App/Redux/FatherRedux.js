import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  name: null,
  error: null,
  fetch: false,
});

// define types and actions
const { Types, Creators } = createActions(
  {
    saveInformation: ['payload'],
    setInformation: ['payload'],
    getInformation: null,
    didFail: ['error'],
  },
  {
    prefix: 'father/',
  }
);

export const FatherTypes = Types;

export const saveInformation = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    fetch: true,
    error: null,
  };
};

export const setInformation = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  return {
    ...state,
    ...payload,
    fetch: false,
    error: null,
  };
};

export const getInformation = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  return {
    ...state,
    fetch: true,
    error: null,
  };
};

export const didFail = (state = INITIAL_STATE, action) => {
  const { error } = action;
  return {
    ...state,
    fetch: false,
    error,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_INFORMATION]: saveInformation,
  [Types.SET_INFORMATION]: setInformation,
  [Types.GET_INFORMATION]: getInformation,
  [Types.DID_FAIL]: didFail,
});

export default Creators;
