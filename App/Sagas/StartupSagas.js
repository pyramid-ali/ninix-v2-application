import { put, call, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'

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

  const { appState, login } = yield select()
  console.log(appState, login, 'startup saga')
  if(appState.didIntroduce) {
    if(login.isLoggedIn)
      yield put(goToMainPage)
    else
      yield put(goToLoginPage)
  }
  else {
    yield put(goToIntroductionPage)
  }

}
