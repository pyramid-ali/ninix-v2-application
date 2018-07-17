import { put, call, select } from 'redux-saga/effects';
import FatherAction from '../Redux/FatherRedux';
import Response from '../Services/Response';
import JsonToModel from '../Transform/JsonToModel';
import ModelToJson from '../Transform/ModelToJson';

export function* saveInformation(api, action) {
  const { payload } = action;
  const { auth } = yield select();
  const response = yield call(
    api.updateFather,
    ModelToJson.father(payload),
    auth.accessToken
  );
  try {
    const data = yield call(Response.resolve, response);
    yield put(FatherAction.setInformation(JsonToModel.father(data.father)));
  } catch (error) {
    yield put(FatherAction.didFail(error.message));
  }
}

export function* getInformation(api, action) {
  const { auth } = yield select();
  const response = yield call(api.getFather, auth.accessToken);
  try {
    const data = yield call(Response.resolve, response);
    yield put(FatherAction.setInformation(JsonToModel.father(data.father)));
  } catch (error) {
    yield put(FatherAction.didFail(error.message));
  }
}
