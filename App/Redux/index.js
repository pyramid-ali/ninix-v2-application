import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    app:            require('./AppRedux').reducer,
    auth:           require('./AuthRedux').reducer,
    baby:           require('./BabyRedux').reducer,
    bluetooth:      require('./BluetoothRedux').reducer,
    dailyStats:     require('./DailyStatRedux').reducer,
    data:           require('./DataRedux').reducer,
    deviceLogs:     require('./DeviceLogRedux').reducer,
    father:         require('./FatherRedux').reducer,
    firmware:       require('./FirmwareRedux').reducer,
    forgotPassword: require('./ForgotPasswordRedux').reducer,
    login:          require('./LoginRedux').reducer,
    mother:         require('./MotherRedux').reducer,
    nav:            require('./NavigationRedux').reducer,
    ninix:          require('./NinixRedux').reducer,
    alarm:          require('./AlarmRedux').reducer,
    signup:         require('./SignupRedux').reducer,
    style:          require('./StyleRedux').reducer,
    user:           require('./UserRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}
