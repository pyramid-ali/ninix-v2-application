import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */
import { StartupTypes } from '../Redux/StartupRedux'
import { AppStateTypes } from '../Redux/AppStateRedux'
import { SignupTypes } from '../Redux/SignupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { AccessAbilityTypes } from '../Redux/AccessAbilityRedux'
import { BluetoothTypes } from '../Redux/BluetoothRedux'


/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import { didAppIntroduce } from './AppStateSaga'
import { startSignup, cancelSignup, requestActivationCode, verifyActivationCode, wrongNumber, finalSignupStep } from './SignupSagas'
import { login } from './LoginSagas'
import { checkConnectivity } from './AccessAbilitySagas'
import { connect } from './BluetoothSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

const root = function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AppStateTypes.INTRODUCE_APP, didAppIntroduce),
    takeLatest(SignupTypes.START, startSignup),
    takeLatest(SignupTypes.CANCEL, cancelSignup),
    takeLatest(SignupTypes.CHECKING_MOBILE, requestActivationCode, api),
    takeLatest(SignupTypes.CHECKING_ACTIVATION_CODE, verifyActivationCode, api),
    takeLatest(SignupTypes.WRONG_NUMBER, wrongNumber),
    takeLatest(SignupTypes.CHECKING_PASSWORD, finalSignupStep, api),
    takeLatest(SignupTypes.CANCEL, cancelSignup),
    takeLatest(LoginTypes.REQUEST, login, api),
    takeLatest(AccessAbilityTypes.NETWORK_STATUS, checkConnectivity),
    takeLatest(BluetoothTypes.START_CONNECTING, connect)
  ]
}

export default root
