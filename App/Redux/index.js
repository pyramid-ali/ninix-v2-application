import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    app:           require('./AppRedux').reducer,
    auth:          require('./AuthRedux').reducer,
    baby:          require('./BabyRedux').reducer,
    bluetooth:     require('./BluetoothRedux').reducer,
    data:          require('./DataRedux').reducer,
    device:        require('./DeviceRedux').reducer,
    father:        require('./ParentRedux').fatherReducer,
    login:         require('./LoginRedux').reducer,
    mother:        require('./ParentRedux').motherReducer,
    nav:           require('./NavigationRedux').reducer,
    ninix:         require('./NinixRedux').reducer,
    alarm:         require('./AlarmRedux').reducer,
    signup:        require('./SignupRedux').reducer,
    style:         require('./StyleRedux').reducer,
    user:          require('./UserRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}
