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

const backFromAddDevice = NavigationActions.back()

export default {
  navigateToLanding,
  navigateToLogin,
  navigateToMain,
  backFromAddDevice
}
