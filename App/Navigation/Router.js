import { NavigationActions } from 'react-navigation'

const resetTo = (routeName) => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName})
  ]
})

const navigateToLanding = resetTo('Landing')
const navigateToLogin = resetTo('Login')
const navigateToMain = resetTo('Main')

export default {
  navigateToLanding,
  navigateToLogin,
  navigateToMain
}
