import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = Immutable({
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  tokenType: null,
});

const { Types, Creators } = createActions(
  {
    issueToken: ['payload'],
    saveToken: ['payload'],
    refreshToken: null,
    revokeToken: null,
  },
  {
    prefix: 'auth/',
  }
);

export const AuthTypes = Types;

export const issueToken = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  return {
    ...payload,
  };
};

const revokeToken = (state = INITIAL_STATE, action) => {
  return INITIAL_STATE;
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ISSUE_TOKEN]: issueToken,
  [Types.REVOKE_TOKEN]: revokeToken,
});

export default Creators;
