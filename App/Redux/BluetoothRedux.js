import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';

import BluetoothStates from '../Bluetooth/BluetoothState';

export const INITIAL_STATE = Immutable({
  state: BluetoothStates.unknown,
  devices: {},
  isConnected: false,
  isConnecting: false,
  isScanning: false,
  isInitiating: false,
  error: null,
  isSyncing: false,
  successSync: false,
  connectedAt: null,
  disconnectedAt: null,
});

const { Types, Creators } = createActions(
  {
    startScan: null,
    stopScan: null,
    cancelConnection: null,
    didDiscover: ['devices'],
    didStateChange: ['status'],
    connect: ['device'],
    setup: ['device'],
    disconnect: null,
    startSync: null,
    turnOffDevice: null,
    reconnect: null,
    didConnect: ['device'],
    didDisconnect: null,
    didFail: ['error'],
    didSyncBegin: null,
    didSyncEnd: null,
    didSetup: ['payload'],
  },
  {
    prefix: 'bluetooth/',
  }
);

export const BluetoothTypes = Types;

export const didStateChange = (state = INITIAL_STATE, action) => {
  const { status } = action;
  return {
    ...state,
    state: status,
  };
};

export const startScan = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: null,
    isScanning: true,
  };
};

export const stopScan = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isScanning: false,
    error: null,
    devices: [],
  };
};

export const cancel = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnected: false,
    isConnecting: false,
  };
};

export const didDiscover = (state = INITIAL_STATE, action) => {
  const { devices } = action;
  return {
    ...state,
    devices,
  };
};

export const connect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnecting: true,
    isConnected: false,
    error: null,
  };
};

export const didConnect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    devices: [],
    isConnected: true,
    isConnecting: false,
    isScanning: false,
    connectedAt: moment(),
  };
};

export const setup = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isInitiating: true,
  };
};

export const didDisconnect = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isConnected: false,
    isConnecting: false,
    isInitiating: false,
    disconnectedAt: moment(),
  };
};

export const didFail = (state = INITIAL_STATE, action) => {
  const { error } = action;
  return {
    ...state,
    isConnected: false,
    isConnecting: false,
    isInitiating: false,
    error,
  };
};

export const didSyncBegin = (state = INITIAL_STATE, action) => {
  const { error } = action;
  return {
    ...state,
    isSyncing: true,
    successSync: false,
    error,
  };
};

export const didSyncEnd = (state = INITIAL_STATE, action) => {
  const { error } = action;
  return {
    ...state,
    isSyncing: false,
    successSync: true,
    error,
  };
};

export const didSetup = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isInitiating: false,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_SCAN]: startScan,
  [Types.STOP_SCAN]: stopScan,
  [Types.CONNECT]: connect,
  [Types.DID_CONNECT]: didConnect,
  [Types.DID_DISCONNECT]: didDisconnect,
  [Types.CANCEL_CONNECTION]: cancel,
  [Types.DID_STATE_CHANGE]: didStateChange,
  [Types.DID_DISCOVER]: didDiscover,
  [Types.DID_FAIL]: didFail,
  [Types.DID_SYNC_BEGIN]: didSyncBegin,
  [Types.DID_SYNC_END]: didSyncEnd,
  [Types.DID_SETUP]: didSetup,
});

export default Creators;
