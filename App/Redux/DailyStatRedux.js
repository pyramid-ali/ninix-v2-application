import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import _ from 'lodash';

// define initial state when for first time launch
export const INITIAL_STATE = Immutable({
  data: {},
});

// define types and actions
const { Types, Creators } = createActions(
  {
    set: ['payload'],
    update: ['dailyStats'],
    retrieveFromServer: null,
  },
  {
    prefix: 'dailyStat/',
  }
);

export const DailyStatTypes = Types;

export const set = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  const now = moment().format('YYYY-MM-DD');
  return {
    ...state,
    data: {
      ...state.data,
      [now]: {
        ...state.data[now],
        ...payload,
        registerAt: now,
        sync: false,
      },
    },
  };
};

export const update = (state = INITIAL_STATE, action) => {
  const { dailyStats } = action;
  const data = dailyStats.reduce(
    (acc, curr) => ({ ...acc, [curr.registerAt]: { ...curr, sync: true } }),
    {}
  );
  return {
    ...state,
    data: {
      ...state.data,
      ...data,
    },
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET]: set,
  [Types.UPDATE]: update,
});

export default Creators;
