import { put, call, select } from 'redux-saga/effects'
import SignupAction from '../Redux/SignupRedux'
import Response from '../Services/Response'



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
    yield put(SignupAction.successTokenRequest(data.result.mobile))
    callback()
  }
  catch (error) {
    yield put(SignupAction.failure(error.message))
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

}


