import { NavigationActions } from 'react-navigation'

const navigateToLogin = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
  ]
})

const navigateToMain = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main'})
  ]
})

export default {
  navigateToLogin,
  navigateToMain
}
