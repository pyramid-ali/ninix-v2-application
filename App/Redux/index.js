import { combineReducers } from 'redux';
import { resettableReducer } from 'reduxsauce';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

const resettable = resettableReducer('RESET');

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    app: require('./AppRedux').reducer,
    auth: resettable(require('./AuthRedux').reducer),
    baby: resettable(require('./BabyRedux').reducer),
    bluetooth: require('./BluetoothRedux').reducer,
    dailyStats: resettable(require('./DailyStatRedux').reducer),
    data: resettable(require('./DataRedux').reducer),
    father: resettable(require('./FatherRedux').reducer),
    firmware: resettable(require('./FirmwareRedux').reducer),
    forgotPassword: resettable(require('./ForgotPasswordRedux').reducer),
    login: resettable(require('./LoginRedux').reducer),
    mother: resettable(require('./MotherRedux').reducer),
    nav: resettable(require('./NavigationRedux').reducer),
    ninix: resettable(require('./NinixRedux').reducer),
    ninixLog: resettable(require('./NinixLogRedux').reducer),
    alarm: resettable(require('./AlarmRedux').reducer),
    signup: resettable(require('./SignupRedux').reducer),
    style: resettable(require('./StyleRedux').reducer),
    user: resettable(require('./UserRedux').reducer),
  });

  return configureStore(rootReducer, rootSaga);
};
