import { put, call, select } from 'redux-saga/effects'
import Response from '../Services/Response'
import UserAction from '../Redux/UserRedux'
import ModelToJson from "../Transform/ModelToJson";

export function *changePassword (api, action) {
  const { newPassword, oldPassword, onSuccess, onFail } = action
  const { auth } = yield select()

  const response = yield call(api.changePassword, ModelToJson.changePassword({newPassword, oldPassword}), auth.accessToken)

  try {
    const result = yield call(Response.resolve, response)
    onSuccess(result)
  }
  catch (e) {
    onFail(e.message)
  }

  yield put(UserAction.end())

}
