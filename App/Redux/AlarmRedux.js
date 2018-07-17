import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import moment from 'moment';

import { respiratory } from '../Transform/DataDisplay';

export const INITIAL_STATE = Immutable({
  respiratory: {},
  temperature: {},
  orientation: {},
});

const { Types, Creators } = createActions(
  {
    save: ['alarm'],
    sync: ['data'],
  },
  {
    prefix: 'alarm/',
  }
);

export const AlarmTypes = Types;

export const save = (state = INITIAL_STATE, action) => {
  const { alarm } = action;
  return {
    ...state,
    respiratory: {
      ...state.respiratory,
      ..._.get(alarm, 'respiratory', {}),
    },
    temperature: {
      ...state.temperature,
      ..._.get(alarm, 'temperature', {}),
    },
    orientation: {
      ...state.orientation,
      ..._.get(alarm, 'orientation', {}),
    },
  };
};

export const sync = (state = INITIAL_STATE, action) => {
  const { data } = action;
  const oldState = { ...state };
  for (let i = 0; i < data.length; i++) {
    oldState[data[i]['type']][moment(data[i]['registerAt']).unix()][
      'sync'
    ] = true;
  }
  return oldState;
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: save,
  [Types.SYNC]: sync,
});

export default Creators;
