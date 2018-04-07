import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import Api from '../Services/Api'

/* ------------- Types ------------- */
import { AppTypes }       from '../Redux/AppRedux'
import { AuthTypes }      from '../Redux/AuthRedux'
import { BabyTypes }      from '../Redux/BabyRedux'
import { BluetoothTypes } from '../Redux/BluetoothRedux'
import { DataTypes }      from '../Redux/DataRedux'
import { LoginTypes }     from '../Redux/LoginRedux'
import { ParentTypes }    from '../Redux/ParentRedux'
import { SignupTypes }    from '../Redux/SignupRedux'
import { DeviceTypes }    from '../Redux/DeviceRedux'
import { StartupTypes }   from '../Redux/StartupRedux'
import { UserTypes }      from '../Redux/UserRedux'


/* ------------- Sagas ------------- */

const AppSagas = require('./AppSagas')
const AuthSagas = require('./AuthSagas')
const BabySagas = require('./BabySagas')
const BluetoothSagas  = require('./BluetoothSagas')
const DataSagas = require('./DataSagas')
const LoginSagas = require('./LoginSagas')
const DeviceSagas = require('./DeviceSagas')
const ParentSagas = require('./ParentSagas')
const SignupSagas = require('./SignupSagas')

/* ------------- API ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = Api.create()

/* ------------- Connect Types To Sagas ------------- */
const root = function * root () {


  yield all([
    // App Sagas
    takeLatest(AppTypes.INIT, AppSagas.init),
    takeLatest(AppTypes.SYNC, AppSagas.sync),
    takeLatest(AppTypes.LOGOUT, AppSagas.logout),

    // Auth Sagas
    takeLatest(AuthTypes.REVOKE_TOKEN, AuthSagas.revokeToken),
    takeLatest(AuthTypes.SAVE_TOKEN, AuthSagas.saveToken),

    // Login Sagas
    takeLatest(LoginTypes.REQUEST, LoginSagas.login, api),

    // Signup Sagas
    takeLatest(SignupTypes.REQUEST_TOKEN, SignupSagas.requestToken, api),
    takeLatest(SignupTypes.CHECK_TOKEN, SignupSagas.checkToken, api),

    // Parent Sagas
    takeLatest(ParentTypes.SAVE_FATHER_INFORMATION, ParentSagas.saveFatherInformation, api),
    takeLatest(ParentTypes.SAVE_MOTHER_INFORMATION, ParentSagas.saveMotherInformation, api),
    takeLatest(ParentTypes.GET_FATHER_INFORMATION, ParentSagas.getFatherInformation, api),
    takeLatest(ParentTypes.GET_MOTHER_INFORMATION, ParentSagas.getMotherInformation, api),

    // Baby Sagas
    takeLatest(BabyTypes.SAVE_INFORMATION, BabySagas.saveBabyInformation, api),
    takeLatest(BabyTypes.GET_INFORMATION, BabySagas.getBabyInformation, api),

    // Device Sagas
    // takeLatest(DeviceTypes.PULL_DEVICE_LOGS, DeviceSagas.pullDeviceLogs, api),
    // takeLatest(DeviceTypes.PUSH_DEVICE_LOGS, DeviceSagas.pushDeviceLogs, api),
    // takeLatest(DeviceTypes.GET_LATEST_FIRMWARE_VERSION, DeviceSagas.getLatestFirmwareVersion, api),

    // Bluetooth Sagas
    takeLatest(BluetoothTypes.START_SCAN, BluetoothSagas.startScan),
    takeLatest(BluetoothTypes.STOP_SCAN, BluetoothSagas.stopScan),
    takeLatest(BluetoothTypes.CONNECT, BluetoothSagas.connect),
    takeLatest(BluetoothTypes.DISCONNECT, BluetoothSagas.disconnect),
    takeLatest(BluetoothTypes.CANCEL_CONNECTION, BluetoothSagas.cancelConnection),
    takeLatest(BluetoothTypes.START_SYNC, BluetoothSagas.startSync),


    // Data Sagas
    takeEvery(DataTypes.DID_RECEIVE_DATA, DataSagas.didReceiveData, api),
    takeLatest(DataTypes.SYNC_WITH_SERVER, DataSagas.syncWithServer, api),

    // setup Network listener
    takeLatest(AppTypes.DID_CONNECTIVITY_CHANGE, DataSagas.syncWithServer, api)
  ])
}

export default root
