import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = Immutable({
  isSyncing: false,
  state: null,
  isConnected: false,
  isIntroduced: false,
});

// TODO: is it a right place to put logout here?
const { Types, Creators } = createActions(
  {
    init: null,
    sync: null,
    didSync: null,
    didConnectivityChange: ['payload'],
    didStateChange: ['payload'],
    didAppIntroduce: null,
    logout: null,
  },
  {
    prefix: 'app/',
  }
);

export const AppTypes = Types;

export const sync = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSyncing: true,
  };
};

export const didSync = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSyncing: false,
  };
};

export const connectivityChanged = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnected: action.payload,
  };
};

export const stateChanged = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    state: action.payload,
  };
};

export const AppIntroduced = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isIntroduced: true,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SYNC]: sync,
  [Types.DID_SYNC]: didSync,
  [Types.DID_CONNECTIVITY_CHANGE]: connectivityChanged,
  [Types.DID_STATE_CHANGE]: stateChanged,
  [Types.DID_APP_INTRODUCE]: AppIntroduced,
});

export default Creators;
