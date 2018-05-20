import { put, call } from 'redux-saga/effects'
import SignupAction from '../Redux/SignupRedux'
import Response from '../Services/Response'
import AuthAction from '../Redux/AuthRedux'
import Router from '../Navigation/Router'

/***
 * request token send mobile code and if response is ok then call callback
 * if response were failed then dispatch failure action of Signup redux
 * @param api
 * @param action
 */
export function *requestToken (api, action) {

  const { mobile, callback } = action
  const response = yield call(api.requestActivationCode, mobile)

  try {
    const data = yield call(Response.resolve, response)
    yield put(SignupAction.didRequestSuccess())
    callback(data.mobile)
  }
  catch (error) {
    yield put(SignupAction.didRequestFail(error.message))
  }

}

/***
 * check activation code is correct, if activation code is correct try to get access token with provided password
 * if getting access token failed, call failure callback
 * if everything was ok, then call callback function
 * @param api
 * @param action
 */
export function *checkToken(api, action) {
  const { mobile, token, callback } = action
  const response = yield call(api.checkActivationCode, mobile, token)

  try {
    const data = yield call(Response.resolve, response)
    yield put(SignupAction.didRequestSuccess())
    callback(data.mobile, data.token)
  }
  catch (error) {
    yield put(SignupAction.didRequestFail(error.message))
  }

}

export function *register(api, action) {
  const { mobile, token, password } = action
  const response = yield call(api.register, mobile, token, password)

  try {
    const token = yield call(Response.resolve, response)
    yield put(SignupAction.didRequestSuccess())
    yield put(AuthAction.saveToken(token))
    yield put(Router.navigateToMain)
  }
  catch (error) {
    yield put(SignupAction.didRequestFail(error.message))
  }

}
