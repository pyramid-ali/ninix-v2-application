import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    appState: require('./AppStateRedux').reducer,
    signup: require('./SignupRedux').reducer,
    login: require('./LoginRedux').reducer,
    token: require('./AcccessTokenRedux').reducer,
    accessAbility: require('./AccessAbilityRedux').reducer,
    bluetooth: require('./BluetoothRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
