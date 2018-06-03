import { put, call, select } from 'redux-saga/effects'
import BabyAction from '../Redux/BabyRedux'
import Response from '../Services/Response'
import JsonToModel from '../Transform/JsonToModel'
import ModelToJson from "../Transform/ModelToJson";

export function *setBabyImage (api, action) {
  // yield setImage(api, action, 'baby', BabyAction.updateWithoutSync)
}

export function *saveInformation (api, action) {
  const { payload } = action
  const { auth } = yield select()
  const response = yield call(api.updateBaby, ModelToJson.baby(payload), auth.accessToken)
  try {
    const data = yield call(Response.resolve, response)
    yield put(BabyAction.setInformation(JsonToModel.baby(data.baby)))
  }
  catch (error) {
    console.tron.error({error})
    yield put(BabyAction.didFail(error.message))
  }
}


export function *getInformation (api) {

  const { auth } = yield select()
  const response = yield call(api.getBaby, auth.accessToken)

  try {
    const data = yield call(Response.resolve, response)
    yield put(BabyAction.setInformation(JsonToModel.baby(data.baby)))
  }
  catch (error) {
    console.tron.error({error})
    yield put(BabyAction.didFail(error.message))
  }

}
