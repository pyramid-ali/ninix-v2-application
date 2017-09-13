import { put, call, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import LoginModel from '../Models/loginModel'
import Login from '../Redux/LoginRedux'
import TokenModel from '../Models/TokenModel'
import AccessToken from '../Redux/AcccessTokenRedux'
import Sync from '../Services/Sync'

const goToMainPage = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})


export function *login(api, action) {
  const { mobile, password } = action
  const loginModel = new LoginModel(mobile, password)
  const response = yield call(api.login, loginModel.fields())

  if(response.ok) {
    const payload = yield TokenModel.correctObject(response.data)
    yield put(AccessToken.issueToken(payload))
    yield put(Login.success())
    yield put(goToMainPage)
    Sync.start()
  }
  else {
    const { message } = response.data
    if (message) {
      yield put(Login.failure(message))
    }
    else {
      yield put(Login.failure(response.problem))
    }

  }

}
