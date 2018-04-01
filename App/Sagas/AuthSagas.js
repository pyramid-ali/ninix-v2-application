import { call, put, select } from 'redux-saga/effects'
import { removeToken, setToken, jsonTokenToObject } from '../Services/TokenManager'
import AuthAction from '../Redux/AuthRedux'

export function *saveToken(action) {

  const { payload } = action
  yield put(AuthAction.issueToken(jsonTokenToObject(payload)))
  try {
    yield call(setToken, payload)
  }
  catch (error) {
    console.tron.log(error, 'issueToken error')
  }
}

export function *revokeToken (action) {
  try {
    yield call(removeToken)
  }
  catch (error) {
    // TODO: error occurred for removing token
    console.tron.log(error, 'revokeToken error')
  }
}

export function *checkTokenWithServer (api, action) {

}

