import { put, call, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import TokenManager from '../Services/Token/TokenManager';
import UserAction from '../Redux/UserRedux'

const goToIntroductionPage = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'IntroductionPage'})
  ]
})

const goToLoginPage = NavigationActions.reset({
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


export function *startup (action) {

  const token = yield call(TokenManager.getToken)
  if (token) {
    yield put(UserAction.loggedIn())
  }
  const { appState, user } = yield select()

  if (user.isLoggedIn) {
    // TODO: sync user information
    yield put(goToMainPage)
  }
  else if (appState.didIntroduce) {
    yield put(goToLoginPage)
  }
  else {
    yield put(goToIntroductionPage)
  }

}
