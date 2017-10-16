import { put, call, select } from 'redux-saga/effects'
import SignupAction from '../Redux/SignupRedux'
import ErrorMessage from '../Transform/ErrorMessage'
import LoginModel from '../Models/loginModel'
import LoginAction from '../Redux/LoginRedux'
import UserAction from '../Redux/UserRedux'
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
  console.log(response, 'response request mobile')
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
  console.log('check token')
  const { signup } = yield select()
  const { token, callback, failure } = action
  const { mobile } = signup
  const activationCodeResponse = yield call(api.checkActivationCode, {mobile, token})
  console.log(activationCodeResponse, 'activation code response')
  try {
    const data = yield call(Response.resolve, activationCodeResponse)
    const { result } = data
    const { password } = result

    yield put(LoginAction.request(mobile, password, () => {
      console.log('callback in check token')
      callback(password)
    }))
    console.log('end of check token')
    return
  }
  catch (error) {
    yield put(SignupAction.failure(error.message))
  }

}


