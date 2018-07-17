import { put, call, select } from 'redux-saga/effects';
import JsonToModel from '../Transform/JsonToModel';
import AlarmAction from '../Redux/AlarmRedux';

export function* save(api) {
  const { alarm, auth } = yield select();
  const unSynced = Object.keys(alarm)
    .map(key => alarm[key])
    .reduce(
      (acc, curr) => [...acc, ...Object.keys(curr).map(key => curr[key])],
      []
    )
    .filter(item => !item.sync);
  const data = unSynced.map(JsonToModel.alarm);
  if (data.length) {
    const response = yield call(api.sendAlarms, { data }, auth.accessToken);
    try {
      const result = yield call(Response.resolve, response);
      yield put(AlarmAction.sync(data));
    } catch (e) {
      console.tron.log({ e });
    }
  }
}
