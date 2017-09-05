import { put, call, select } from 'redux-saga/effects'
import Api from '../Services/Api'
import ParenModel from '../Models/ParentModel'



export function *syncFather (action) {
  const { payload } = action
  const { accessAbility } = yield select()
  const api = Api.createAuthorized()
  console.log(payload, 'payload', action)
  if (accessAbility.wifiOn) {
    console.log('wifi is on')
    const fatherFields = ParenModel.toJson(payload)
    console.log(fatherFields, 'father fields')
    const response = yield call(api.postFatherInformation, fatherFields)
    console.log(response, 'response')
    if (response.ok) {
      console.log('response is ok')
    }
  }

}

export function *syncMother (api, action) {

}
