import { put, call } from 'redux-saga/effects'
import LoginModel from '../Models/loginModel'
import LoginAction from '../Redux/LoginRedux'
import Sync from '../Services/Sync'
import UserAction from '../Redux/UserRedux'
import Response from '../Services/Response'
import TokenManager from '../Services/Token/TokenManager'


export function *login (api, privateApi, action) {
  console.log('start login')
  const { mobile, password, callback } = action
  const response = yield call(api.login, new LoginModel(mobile, password).fields())
  console.log(response)
  try {
    const data = yield call(Response.resolve, response)
    const token = yield call(TokenManager.save, data)
    yield call(privateApi.authorize, token)
    yield put(UserAction.loggedIn())
    yield put(LoginAction.success())

    callback()
    // TODO: start syncing
  }
  catch (error) {
    console.log(error, 'error login')
    yield put(LoginAction.failure(error.message))
  }

}
