import { put, call, select } from 'redux-saga/effects'
import Api from '../Services/Api'
import ParentModel from '../Models/ParentModel'
import ParentAction from '../Redux/ParentRedux'



export function *syncFather (action) {
  const { payload } = action
  const { accessAbility } = yield select()
  const api = Api.createAuthorized()

  if (accessAbility.wifiOn) {
    const fatherFields = ParentModel.toJson(payload)
    const response = yield call(api.postFatherInformation, fatherFields)

    if (response.ok) {
      const data = response.data
      const parent = ParentModel.fromJson(data)
      yield put(ParentAction.syncFather(parent))
    }
    else {
      // TODO: Show user error when sending data to database
    }
  }

}

export function *retrieveFather (action) {
  console.log('retrieveFather')
  const api = Api.createAuthorized()
  const response = yield call(api.retrieveFatherInformation)
  if (response.ok) {
    const data = response.data
    const parent = ParentModel.fromJson(data)
    yield put(ParentAction.syncFather(parent))
  }
  else {
    // TODO: handle error when an error occurred in retrieving information
  }
}

export function *syncMother (action) {
  const { payload } = action
  const { accessAbility } = yield select()
  const api = Api.createAuthorized()

  if (accessAbility.wifiOn) {
    const motherFields = ParentModel.toJson(payload)
    const response = yield call(api.postMotherInformation, motherFields)

    if (response.ok) {
      const data = response.data
      const parent = ParentModel.fromJson(data)
      yield put(ParentAction.syncMother(parent))
    }
    else {
      // TODO: Show user error when sending data to database
    }
  }
}

export function *retrieveMother (action) {
  const api = Api.createAuthorized()
  const response = yield call(api.retrieveMotherInformation)

  if (response.ok) {
    const data = response.data
    const parent = ParentModel.fromJson(data)
    yield put(ParentAction.syncMother(parent))
  }
  else {
    // TODO: handle error when an error occurred in retrieving information
  }
}
