import { put, call, select } from 'redux-saga/effects'
import BabyModel from '../Models/BabyModel'
import BabyAction from '../Redux/BabyRedux'
import {setImage} from './UploadSagas';
import Response from '../Services/Response'

export function *setBabyImage (api, action) {
  // yield setImage(api, action, 'baby', BabyAction.updateWithoutSync)
}

export function *saveBabyInformation (api, action) {
  const { baby, auth } = yield select()
  const { onSuccess, onFailure } = action
  const response = yield call(api.sendInformation, 'baby', BabyModel.toJson(baby), auth.accessToken)

  try {
    const data = yield call(Response.resolve, response)
    yield put(BabyAction.setInformation(BabyModel.fromJson(data.baby)))
    onSuccess(data)
  }
  catch (error) {
    onFailure(error)
  }
}


export function *getBabyInformation (api, action) {

  const { auth } = yield select()

  const response = yield call(api.getInformation, 'baby', auth.accessToken)

  try {
    const data = yield call(Response.resolve, response)
    yield put(BabyAction.setInformation(BabyModel.fromJson(data.baby)))
  }
  catch (error) {
    console.log(error, 'error at baby get information')
  }

}
