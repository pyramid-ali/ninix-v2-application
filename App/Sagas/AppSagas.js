import { NetInfo } from 'react-native'
import { put, call, select, fork } from 'redux-saga/effects'

import { getToken, isTokenValid } from '../Services/TokenManager'
import AppAction from '../Redux/AppRedux'
import AuthAction from '../Redux/AuthRedux'
import ParentAction from '../Redux/ParentRedux'
import BabyAction from '../Redux/BabyRedux'
import BluetoothAction from '../Redux/BluetoothRedux'
import DataAction from '../Redux/DataRedux'
import Router from '../Navigation/Router'
import Form from '../Services/Form'
import Response from '../Services/Response'

// channels
import {
  setupAppStatusListener,
  setupAppStatusListenerChannel,
  setupNetStatusListener,
  setupNetStatusListenerChannel,
  setupBluetoothStatusListener,
  setupBluetoothStatusListenerChannel
} from './Channels/AppChannel'


export function *init (api, action) {

  const { app } = yield select()

  // setup listeners for app state change and network connectivity
  yield fork(setupAppStatusListener, yield call(setupAppStatusListenerChannel))
  yield fork(setupNetStatusListener, yield call(setupNetStatusListenerChannel))
  yield fork(setupBluetoothStatusListener, yield call(setupBluetoothStatusListenerChannel))

  try {

    // this section is belong to check user authority
    const token = yield call(getToken)

    // if token doesn't exist, check for app Introduction to showing landing page
    if (!token) {
      if (app.isIntroduced) yield put(Router.navigateToLogin)
      else yield put(Router.navigateToLanding)
      return
    }


    if (!isTokenValid(token)) {

      const refreshToken = token.refreshToken
      if (!refreshToken) {
        yield put(Router.navigateToLogin)
        return
      }

      const response = yield call(api.refreshToken, refreshToken)
      const token = yield call(Response.resolve, response)
      yield put(AuthAction.saveToken(token))

    } else {
      yield put(AuthAction.issueToken(token))
    }

    // yield put(AppAction.sync())
    yield put(Router.navigateToMain)

  }
  catch (error) {
    console.tron.error({
      file: 'Sagas/AppSagas.js',
      func: 'init',
      error,
      message: error.message
    })

    // when an error occurred when initializing app
    if (app.isIntroduced) {
      yield put(Router.navigateToLogin)
    }
    else {
      yield put(Router.navigateToLanding)
    }
  }

}

// TODO: synchronization with server handle in the latest stage
export function *sync () {

  const { auth } = yield select()
  if (!auth.accessToken) {
    yield put(AppAction.didSync())
    return
  }

  // 1. get user information
  // 2. get mother and father user information
  yield put(ParentAction.getFatherInformation())
  yield put(ParentAction.getMotherInformation())
  yield put(BabyAction.getInformation())
  yield put(DataAction.syncWithServer())
  // 3. check for parent picture sync
  // 4. check data received from device is sync or not

}

export function *logout (action) {

  yield put(BluetoothAction.disconnect())
  yield put(AuthAction.revokeToken())
  yield put(Router.navigateToLogin)

}
