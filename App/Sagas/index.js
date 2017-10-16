import { takeLatest, takeEvery, all, call } from 'redux-saga/effects'
import PublicApi from '../Services/Api/Public'
import PrivateApi from '../Services/Api/Private'

/* ------------- Types ------------- */
// import { StartupTypes } from '../Redux/StartupRedux'
// import { AppStateTypes } from '../Redux/AppStateRedux'
import { SignupTypes } from '../Redux/SignupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { LoginTypes } from '../Redux/LoginRedux'
// import { AccessAbilityTypes } from '../Redux/AccessAbilityRedux'
// import { BluetoothTypes } from '../Redux/BluetoothRedux'
// import { DataTypes } from '../Redux/DataRedux'
// import { ParentTypes } from '../Redux/ParentRedux'
// import { BabyTypes } from '../Redux/BabyRedux'
//
//
// /* ------------- Sagas ------------- */
// import { startup } from './StartupSagas'
import { requestToken, checkToken } from './SignupSagas'
import { changePassword} from './UserSagas'
// import { startSignup, cancelSignup, requestActivationCode, verifyActivationCode, wrongNumber, finalSignupStep } from './SignupSagas'
import { login } from './LoginSagas'
// import { checkConnectivity } from './AccessAbilitySagas'
// import { connect } from './BluetoothSagas'
// import { receiveData, checkUnsyncedData } from './DataSagas'
// import { syncFather, syncMother, retrieveFather, retrieveMother } from './ParentSagas'
// import { syncBaby, retrieveBaby } from './BabySagas'

/* ------------- API ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const publicApi = PublicApi.create()

/* ------------- Connect Types To Sagas ------------- */

const root = function * root () {
  const privateApi = yield call(PrivateApi.create)
  yield all([
    takeLatest(SignupTypes.REQUEST_TOKEN, requestToken, publicApi),
    takeLatest(SignupTypes.CHECK_TOKEN, checkToken, publicApi),
    takeLatest(UserTypes.CHANGE_PASSWORD, changePassword, privateApi),
    // takeLatest(StartupTypes.STARTUP, startup),
    // takeLatest(SignupTypes.START, startSignup),
    // takeLatest(SignupTypes.CANCEL, cancelSignup),
    // takeLatest(SignupTypes.CHECKING_MOBILE, requestActivationCode, api),
    // takeLatest(SignupTypes.CHECKING_ACTIVATION_CODE, verifyActivationCode, api),
    // takeLatest(SignupTypes.WRONG_NUMBER, wrongNumber),
    // takeLatest(SignupTypes.CHECKING_PASSWORD, finalSignupStep, api),
    // takeLatest(SignupTypes.CANCEL, cancelSignup),
    takeLatest(LoginTypes.REQUEST, login, publicApi, privateApi),
    // takeLatest(AccessAbilityTypes.NETWORK_STATUS, checkConnectivity),
    // takeLatest(BluetoothTypes.START_CONNECTING, connect),
    // takeEvery(DataTypes.RECEIVE_DATA, receiveData),
    // takeEvery(DataTypes.RECEIVE_UNSYNC_DATA, checkUnsyncedData),
    // takeLatest(ParentTypes.UPDATE_FATHER, syncFather),
    // takeLatest(ParentTypes.RETRIEVE_FATHER, retrieveFather),
    // takeLatest(ParentTypes.UPDATE_MOTHER, syncMother),
    // takeLatest(ParentTypes.RETRIEVE_MOTHER, retrieveMother),
    // takeLatest(BabyTypes.UPDATE, syncBaby),
    // takeLatest(BabyTypes.RETRIEVE, retrieveBaby),
  ])
}

export default root
