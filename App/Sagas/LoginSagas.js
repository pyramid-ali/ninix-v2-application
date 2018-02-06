import { put, call, race } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'

import LoginModel from '../Models/loginModel'
import LoginAction from '../Redux/LoginRedux'
import Response from '../Services/Response'
import AuthAction from '../Redux/AuthRedux'
import AppAction from '../Redux/AppRedux'

const gotoMainPage = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})

export function *login (api, action) {

  const { mobile, password } = action
  const response = yield call(api.login, new LoginModel(mobile, password).fields())

  try {
    const token = yield call(Response.resolve, response)
    yield put(AuthAction.saveToken(token))
    yield put(AppAction.sync())
    yield put(gotoMainPage)
    // TODO: start syncing
  }
  catch (error) {
    yield put(LoginAction.failure(error.message || error.problem))
  }

}
