import { put, call, select, fork, cancel } from 'redux-saga/effects';

import { getToken, isTokenValid } from '../Services/TokenManager';
import AppAction from '../Redux/AppRedux';
import AuthAction from '../Redux/AuthRedux';
import BabyAction from '../Redux/BabyRedux';
import FatherAction from '../Redux/FatherRedux';
import MotherAction from '../Redux/MotherRedux';
import DailyStatAction from '../Redux/DailyStatRedux';
import BluetoothAction from '../Redux/BluetoothRedux';
import FirmwareAction from '../Redux/FirmwareRedux';
import Router from '../Navigation/Router';
import Response from '../Services/Response';

// channels
import {
  setupAppStatusListener,
  setupAppStatusListenerChannel,
  setupNetStatusListener,
  setupNetStatusListenerChannel,
  setupBluetoothStatusListener,
  setupBluetoothStatusListenerChannel,
} from './Channels/AppChannel';
import VitalSign from '../Realm/VitalSign';
import Alarm from '../Realm/Alarm';

export function* init(api) {
  const { app } = yield select();

  // setup listeners for app state change and network connectivity
  yield fork(setupAppStatusListener, yield call(setupAppStatusListenerChannel));
  yield fork(setupNetStatusListener, yield call(setupNetStatusListenerChannel));
  yield fork(
    setupBluetoothStatusListener,
    yield call(setupBluetoothStatusListenerChannel)
  );

  try {
    // this section is belong to check user authority
    const token = yield call(getToken);

    // if token doesn't exist, check for app Introduction to showing landing page
    if (!token) {
      if (app.isIntroduced) yield put(Router.navigateToLogin);
      else yield put(Router.navigateToLanding);
      return;
    }

    if (!isTokenValid(token)) {
      const refreshToken = token.refreshToken;
      if (!refreshToken) {
        yield put(Router.navigateToLogin);
        return;
      }

      const response = yield call(api.refreshToken, refreshToken);
      const token = yield call(Response.resolve, response);
      yield put(AuthAction.saveToken(token));
    } else {
      yield put(AuthAction.issueToken(token));
    }

    yield put(AppAction.sync(api));
    yield put(Router.navigateToMain);
  } catch (error) {
    console.tron.error({
      file: 'Sagas/AppSagas.js',
      func: 'init',
      error,
      message: error.message,
    });

    // when an error occurred when initializing app
    if (app.isIntroduced) {
      yield put(Router.navigateToLogin);
      yield logout(api);
    } else {
      yield put(Router.navigateToLanding);
    }
  }
}

export function* sync(api) {
  const { auth } = yield select();
  if (!auth.accessToken) {
    yield put(AppAction.didSync());
    return;
  }

  yield put(BabyAction.getInformation());
  yield put(FatherAction.getInformation());
  yield put(MotherAction.getInformation());
  yield put(DailyStatAction.retrieveFromServer());
  yield put(FirmwareAction.checkLatestVersion());
}

export function* logout(api) {
  const { auth } = yield select();
  yield put(BluetoothAction.disconnect());
  yield put(AuthAction.revokeToken());
  // it's not matter that request is successful or not for logout, but it should be matter later
  yield call(api.logout, auth.accessToken);
  yield put({ type: 'RESET' });
  clearDatabase();
  yield init(api);
}

function clearDatabase() {
  VitalSign.removeAll();
  Alarm.removeAll();
}
