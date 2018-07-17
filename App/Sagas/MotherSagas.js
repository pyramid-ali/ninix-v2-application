import { put, call, select } from 'redux-saga/effects';
import MotherAction from '../Redux/MotherRedux';
import Response from '../Services/Response';
import JsonToModel from '../Transform/JsonToModel';
import ModelToJson from '../Transform/ModelToJson';

export function* saveInformation(api, action) {
  const { payload } = action;
  const { auth } = yield select();
  const response = yield call(
    api.updateMother,
    ModelToJson.mother(payload),
    auth.accessToken
  );
  try {
    const data = yield call(Response.resolve, response);
    yield put(MotherAction.setInformation(JsonToModel.mother(data.mother)));
  } catch (error) {
    yield put(MotherAction.didFail(error.message));
  }
}

export function* getInformation(api, action) {
  const { auth } = yield select();
  const response = yield call(api.getMother, auth.accessToken);
  try {
    const data = yield call(Response.resolve, response);
    yield put(MotherAction.setInformation(JsonToModel.mother(data.mother)));
  } catch (error) {
    yield put(MotherAction.didFail(error.message));
  }
}
