import { put, call, select } from 'redux-saga/effects'
import UserAction from '../Redux/UserRedux'
import ErrorMessage from '../Transform/ErrorMessage';
import TokenManager from '../Services/Token/TokenManager';


export function *changePassword (api, action) {

  const { newPassword, oldPassword, callback } = action
  const { changePassword } = api.methods()

  const response = yield call(changePassword, {
    'old_password': oldPassword,
    'new_password': newPassword
  })

  if (response.ok) {
    yield put(UserAction.success())
    callback()
    return
  }

  if (!response.data) {
    yield put(UserAction.failure(response.problem))
  }
  else {
    const error = ErrorMessage.parse(response.errors)
    yield put(UserAction.failure(error || response.message))
  }


}

// TODO: we can send logout date to server
export function *logout (api, action) {

  yield call(TokenManager.remove)

}
