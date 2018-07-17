import { put, call } from 'redux-saga/effects';
import ForgotPasswordAction from '../Redux/ForgotPasswordRedux';
import Response from '../Services/Response';
import AuthAction from '../Redux/AuthRedux';
import Router from '../Navigation/Router';

/***
 * request token send mobile code and if response is ok then call callback
 * if response were failed then dispatch failure action of Signup redux
 * @param api
 * @param action
 */
export function* requestToken(api, action) {
  const { mobile, callback } = action;
  const response = yield call(api.requestForgotPasswordToken, mobile);

  try {
    const data = yield call(Response.resolve, response);
    yield put(ForgotPasswordAction.didRequestSuccess());
    callback(data.mobile);
  } catch (error) {
    yield put(ForgotPasswordAction.didRequestFail(error.message));
  }
}

/***
 * check if provided token with given mobile number is valid or not
 * @param api
 * @param action
 */
export function* checkToken(api, action) {
  const { mobile, token, callback } = action;
  const response = yield call(api.checkToken, mobile, token);

  try {
    const data = yield call(Response.resolve, response);
    yield put(ForgotPasswordAction.didRequestSuccess());
    callback(data.mobile, data.token);
  } catch (error) {
    yield put(ForgotPasswordAction.didRequestFail(error.message));
  }
}

/***
 * register user
 * @param api
 * @param action
 */
export function* changePassword(api, action) {
  // TODO: this ,ust be change
  const { mobile, token, password } = action;
  const response = yield call(
    api.updateForgotPassword,
    mobile,
    token,
    password
  );

  try {
    const token = yield call(Response.resolve, response);
    yield put(ForgotPasswordAction.didRequestSuccess());
    yield put(AuthAction.saveToken(token));
    yield put(Router.navigateToMain);
  } catch (error) {
    yield put(ForgotPasswordAction.didRequestFail(error.message));
  }
}
