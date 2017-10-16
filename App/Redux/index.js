import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    accessAbility: require('./AccessAbilityRedux').reducer,
    appState:      require('./AppStateRedux').reducer,
    login:         require('./LoginRedux').reducer,
    nav:           require('./NavigationRedux').reducer,
    signup:        require('./SignupRedux').reducer,
    user:          require('./UserRedux').reducer,
    mother:        require('./ParentRedux').motherReducer,
    father:        require('./ParentRedux').fatherReducer,
    baby:          require('./BabyRedux').reducer,


    // bluetooth: require('./BluetoothRedux').reducer,
    // data: require('./DataRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
