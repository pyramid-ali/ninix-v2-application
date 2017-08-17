import { put, call, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { AppState } from '../Redux/AppStateRedux'
import Signup from '../Redux/SignupRedux'
import SignupModel from '../Models/SignupModel'
import AccessToken from '../Redux/AcccessTokenRedux'
import TokenModel from '../Models/TokenModel'

const goToSignupPage = NavigationActions.navigate({
  routeName: 'MobileEntry',
})

const goToActivationCodePage = NavigationActions.navigate({
  routeName: 'ActivationCode',
})

const goToPasswordEntryPage = NavigationActions.navigate({
  routeName: 'PasswordEntry',
})

const backToLoginPage = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'AuthenticationScreen'})
  ]
})

const goToMainPage = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})

const wrongNumberRoute = NavigationActions.back()

export function *startSignup(action) {
  const { navigation } = action
  yield navigation.dispatch(goToSignupPage)
}

export function *cancelSignup(action) {
  yield put(backToLoginPage)
}

export function *requestActivationCode(api, action) {
  const { mobile, navigation } = action
  const response = yield call(api.requestActivationCode, mobile)
  console.log(response, 'request activation code')
  if (response.ok) {
    const { mobile } = response.data
    yield put(Signup.mobileVerified(mobile))
    yield navigation.dispatch(goToActivationCodePage)
  }
  else {
    const { message, detail } = response.data
    yield put(Signup.failure(message))
  }
}

export function *verifyActivationCode(api, action) {

  const { mobile, code, navigation } = action
  const response = yield call(api.checkActivationCode, {mobile, token: code})

  if(response.ok) {
    const { mobile, token, verified } = response.data
    if(verified) {
      yield put(Signup.ActivationCodeVerified(token))
      yield navigation.dispatch(goToPasswordEntryPage)
    }
    else {
      yield put(Signup.failure('Activation code is not correct'))
    }
  }
  else {
    const { problem } = response
    yield put(Signup.failure(problem))
  }
}

export function *finalSignupStep(api, action) {

  const { password } = action
  const { signup } = yield select()

  const signupModel = new SignupModel(signup.mobile, password, signup.activationCode)
  const response = yield call(api.signup, signupModel.fields())

  if(response.ok) {
    const payload = TokenModel.correctObject(response.data)
    yield put(AccessToken.issueToken(payload))
    yield put(Signup.finish())
    yield put(goToMainPage)
  }
  else {
    const { message } = response.data
    yield put(Signup.failure(message))
  }

}

export function *wrongNumber(action) {
  const { navigation } = action
  yield navigation.dispatch(wrongNumberRoute)
}

