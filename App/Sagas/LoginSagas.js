import { put, call, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import LoginModel from '../Models/loginModel'
import Login from '../Redux/LoginRedux'
import TokenModel from '../Models/TokenModel'
import AccessToken from '../Redux/AcccessTokenRedux'

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
  console.log(response, 'response data login')
  if(response.ok) {
    const payload = yield TokenModel.correctObject(response.data)
    console.log(payload, 'payload data login')
    yield put(AccessToken.issueToken(payload))
    yield put(Login.success())
    yield put(goToMainPage)
  }
  else {
    const { message } = response.data
    yield put(Login.failure(message))
  }

}
