import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import { Sentry } from 'react-native-sentry'

Sentry.config('https://95ff995b123944019d988cff03bc1976:eca23c774b854ad8851d854196396fc7@sentry.io/265344').install()

AppRegistry.registerComponent('Ninix', () => App)
