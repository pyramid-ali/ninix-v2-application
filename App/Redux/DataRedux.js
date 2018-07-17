import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = Immutable({
  stream: [],
  sync: [],
  temp: [],
});

const { Types, Creators } = createActions(
  {
    didReceiveData: ['data'],
    didReceiveSync: ['data'],
    didSyncEnd: null,
    syncWithServer: null,
    saveTemp: ['data'],
    removeTemp: null,
  },
  {
    prefix: 'data/',
  }
);

export const DataTypes = Types;

export const didReceiveData = (state = INITIAL_STATE, action) => {
  const { stream } = state;
  const { data } = action;
  return {
    ...state,
    stream: [...stream.slice(stream.length - 1000, stream.length), data],
  };
};

export const didReceiveSync = (state = INITIAL_STATE, action) => {
  const { data } = action;
  const { sync } = state;
  return {
    ...state,
    sync: [...sync, ...data],
  };
};

export const saveTemp = (state = INITIAL_STATE, action) => {
  const { temp } = state;
  const { data } = action;
  return {
    ...state,
    temp: [...temp, data],
  };
};

export const removeTemp = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    temp: [],
  };
};

export const didSyncEnd = (state = INITIAL_STATE, action) => {
  const { sync, temp } = state;
  return {
    ...state,
    sync: [],
    temp: [...sync, ...temp],
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DID_RECEIVE_DATA]: didReceiveData,
  [Types.DID_RECEIVE_SYNC]: didReceiveSync,
  [Types.SAVE_TEMP]: saveTemp,
  [Types.REMOVE_TEMP]: removeTemp,
  [Types.DID_SYNC_END]: didSyncEnd,
});

export default Creators;
