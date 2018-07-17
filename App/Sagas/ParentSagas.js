import { put, call, select, take, fork } from 'redux-saga/effects';
import ParentAction from '../Redux/ParentRedux';
import Response from '../Services/Response';
import { setImage } from './UploadSagas';

export function* setFatherImage(api, action) {
  yield setImage(api, action, 'father', ParentAction.setFatherInformation);
}

export function* setMotherImage(api, action) {
  yield setImage(api, action, 'mother', ParentAction.setMotherInformation);
}

export function* saveFatherInformation(api, action) {
  const { father, auth } = yield select();
  const { onSuccess, onFailure } = action;
  // const response = yield call(api.sendInformation, 'father', ParentModel.toJson(father), auth.accessToken)

  try {
    const data = yield call(Response.resolve, response);
    // yield put(ParentAction.setFatherInformation(ParentModel.fromJson(data.parent)))
    onSuccess(data);
  } catch (error) {
    onFailure(error);
  }
}

export function* saveMotherInformation(api, action) {
  const { mother, auth } = yield select();
  const { onSuccess, onFailure } = action;
  const response = yield call(
    api.sendInformation,
    'mother',
    ParentModel.toJson(mother),
    auth.accessToken
  );

  try {
    const data = yield call(Response.resolve, response);
    // yield put(ParentAction.setMotherInformation(ParentModel.fromJson(data.parent)))
    onSuccess(data);
  } catch (error) {
    onFailure(error);
  }
}

export function* getFatherInformation(api, action) {
  const { auth } = yield select();
  const response = yield call(api.getInformation, 'father', auth.accessToken);
  try {
    const data = yield call(Response.resolve, response);
    // yield put(ParentAction.setFatherInformation(ParentModel.fromJson(data.parent)))
  } catch (error) {
    console.tron.log(error);
  }
}

export function* getMotherInformation(api, action) {
  const { auth } = yield select();
  const response = yield call(api.getInformation, 'mother', auth.accessToken);
  try {
    const data = yield call(Response.resolve, response);
    // yield put(ParentAction.setMotherInformation(ParentModel.fromJson(data.parent)))
  } catch (error) {
    console.tron.log(error);
  }
}
