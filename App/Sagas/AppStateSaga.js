import { put } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'

const goToLoginPage = NavigationActions.reset({
  index: 0,
  key: 'AuthenticationScreen',
  actions: [
    NavigationActions.navigate({ routeName: 'AuthenticationScreen'})
  ]
})

export function *didAppIntroduce(action) {
  yield put(goToLoginPage)
}

