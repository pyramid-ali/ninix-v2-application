import { put, call } from 'redux-saga/effects';

import AppAction from '../Redux/AppRedux';
import AuthAction from '../Redux/AuthRedux';
import LoginAction from '../Redux/LoginRedux';
import Response from '../Services/Response';
import Router from '../Navigation/Router';

export function* login(api, action) {
  const { mobile, password } = action;
  const response = yield call(api.login, mobile, password);

  try {
    const token = yield call(Response.resolve, response);
    yield put(LoginAction.didSuccess());
    yield put(AuthAction.saveToken(token));
    yield put(AppAction.sync());
    yield put(Router.navigateToMain);
  } catch (error) {
    yield put(LoginAction.didFail(error.message || error.problem));
  }
}
