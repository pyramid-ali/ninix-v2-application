import { put, call, select } from 'redux-saga/effects'
import Api from '../Services/Api'
import BabyModel from '../Models/BabyModel'
import BabyAction from '../Redux/BabyRedux'
import {ImageInput} from '../Models/ImageModel'



export function *syncBaby (action) {
  const { payload } = action
  const { accessAbility } = yield select()
  const api = Api.createAuthorized()

  if (accessAbility.wifiOn) {
    const babyFields = BabyModel.toJson(payload)
    const response = yield call(api.postBabyInformation, babyFields)
    console.log(response, 'sync baby')
    if (response.ok) {
      const data = response.data
      const baby = BabyModel.fromJson(data)
      yield put(BabyAction.sync(baby))
    }
    else {
      // TODO: Show user error when sending data to database
    }
  }

}

export function *retrieveBaby (action) {
  const api = Api.createAuthorized()
  const response = yield call(api.retrieveBabyInformation)

  if (response.ok) {
    const data = response.data
    const baby = BabyModel.fromJson(data)
    yield put(BabyAction.sync(baby))
  }
  else {
    // TODO: handle error when an error occurred in retrieving information
  }
}
