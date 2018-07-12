import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import Api from '../Services/Api'

/* ------------- Types ------------- */
import { AppTypes } from '../Redux/AppRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { BabyTypes } from '../Redux/BabyRedux'
import { BluetoothTypes } from '../Redux/BluetoothRedux'
import { DataTypes } from '../Redux/DataRedux'
import { ForgotPasswordTypes } from '../Redux/ForgotPasswordRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { FatherTypes } from '../Redux/FatherRedux'
import { FirmwareTypes } from '../Redux/FirmwareRedux'
import { MotherTypes } from '../Redux/MotherRedux'
import { SignupTypes } from '../Redux/SignupRedux'
import { NinixTypes } from '../Redux/NinixRedux'
import { NinixLogTypes } from '../Redux/NinixLogRedux'
import { UserTypes } from '../Redux/UserRedux'
import { DailyStatTypes } from '../Redux/DailyStatRedux'

/* ------------- Sagas ------------- */

const AppSagas = require('./AppSagas')
const AuthSagas = require('./AuthSagas')
const BabySagas = require('./BabySagas')
const BluetoothSagas  = require('./BluetoothSagas')
const DataSagas = require('./DataSagas')
const FirmwareSagas = require('./FirmwareSagas')
const ForgotPasswordSagas = require('./ForgotPasswordSagas')
const LoginSagas = require('./LoginSagas')
const NinixSagas = require('./NinixSagas')
const NinixLogSagas = require('./NinixLogSagas')
const FatherSagas = require('./FatherSagas')
const MotherSagas = require('./MotherSagas')
const SignupSagas = require('./SignupSagas')
const DailyStatSagas = require('./DailyStatSaga')
const UserSagas = require('./UserSagas')

/* ------------- API ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = Api.create()

export const tasks = [
  // App Sagas
  takeLatest(AppTypes.INIT, AppSagas.init, api),
  takeLatest(AppTypes.SYNC, AppSagas.sync),
  takeLatest(AppTypes.LOGOUT, AppSagas.logout, api),

  // Auth Sagas
  takeLatest(AuthTypes.REVOKE_TOKEN, AuthSagas.revokeToken),
  takeLatest(AuthTypes.SAVE_TOKEN, AuthSagas.saveToken),

  // Login Sagas
  takeLatest(LoginTypes.REQUEST, LoginSagas.login, api),

  // Signup Sagas
  takeLatest(SignupTypes.REQUEST_TOKEN, SignupSagas.requestToken, api),
  takeLatest(SignupTypes.CHECK_TOKEN, SignupSagas.checkToken, api),
  takeLatest(SignupTypes.REGISTER, SignupSagas.register, api),

  // Forgot Password Sagas
  takeLatest(ForgotPasswordTypes.REQUEST_TOKEN, ForgotPasswordSagas.requestToken, api),
  takeLatest(ForgotPasswordTypes.CHECK_TOKEN, ForgotPasswordSagas.checkToken, api),
  takeLatest(ForgotPasswordTypes.CHANGE_PASSWORD, ForgotPasswordSagas.changePassword, api),

  // Parent Sagas
  takeLatest(FatherTypes.SAVE_INFORMATION, FatherSagas.saveInformation, api),
  takeLatest(FatherTypes.GET_INFORMATION, FatherSagas.getInformation, api),
  takeLatest(MotherTypes.SAVE_INFORMATION, MotherSagas.saveInformation, api),
  takeLatest(MotherTypes.GET_INFORMATION, MotherSagas.getInformation, api),

  // Baby Sagas
  takeLatest(BabyTypes.SAVE_INFORMATION, BabySagas.saveInformation, api),
  takeLatest(BabyTypes.GET_INFORMATION, BabySagas.getInformation, api),
  takeLatest(BabyTypes.SET_IMAGE, BabySagas.setImage, api),

  // Bluetooth Sagas
  takeLatest(BluetoothTypes.START_SCAN, BluetoothSagas.startScan),
  takeLatest(BluetoothTypes.STOP_SCAN, BluetoothSagas.stopScan),
  takeLatest(BluetoothTypes.CONNECT, BluetoothSagas.connect),
  takeLatest(BluetoothTypes.DID_CONNECT, BluetoothSagas.didConnect),
  takeLatest(BluetoothTypes.SETUP, BluetoothSagas.setup),
  takeLatest(BluetoothTypes.DID_SETUP, BluetoothSagas.didSetup),
  takeLatest(BluetoothTypes.RECONNECT, BluetoothSagas.reconnect),
  takeLatest(BluetoothTypes.DISCONNECT, BluetoothSagas.disconnect),
  takeLatest(BluetoothTypes.CANCEL_CONNECTION, BluetoothSagas.cancelConnection),
  takeLatest(BluetoothTypes.TURN_OFF_DEVICE, BluetoothSagas.turnOffDevice),

  // Device Types
  takeLatest(NinixTypes.GET_INFORMATION, NinixSagas.getInformation),

  // Connection logs
  takeLatest(NinixLogTypes.DID_CONNECT, NinixLogSagas.didConnect, api),
  takeLatest(NinixLogTypes.DID_DISCONNECT, NinixLogSagas.didDisconnect, api),
  takeLatest(NinixLogTypes.SYNC_WITH_SERVER, NinixLogSagas.syncWithServer, api),

  // Data Sagas
  takeEvery(DataTypes.DID_RECEIVE_DATA, DataSagas.didReceiveData, api),
  takeLatest(DataTypes.SYNC_WITH_SERVER, DataSagas.syncWithServer, api),

  // DailyStat Sagas
  takeLatest(DailyStatTypes.SET, DailyStatSagas.didAddNewRecord, api),
  takeLatest(DailyStatTypes.RETRIEVE_FROM_SERVER, DailyStatSagas.retrieveFromServer, api),

  // User Sagas
  takeLatest(UserTypes.CHANGE_PASSWORD, UserSagas.changePassword, api),

  // firmware
  takeLatest(FirmwareTypes.CHECK_LATEST_VERSION, FirmwareSagas.checkLatestVersion, api),
  takeLatest(FirmwareTypes.START_UPDATE, FirmwareSagas.startUpdate),
  takeLatest(FirmwareTypes.UPDATE, FirmwareSagas.updateFirmware)
]

/* ------------- Connect Types To Sagas ------------- */
const root = function * root () {


  yield all(tasks)
}

export default root
