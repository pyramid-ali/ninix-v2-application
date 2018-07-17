import { put, select, call } from 'redux-saga/effects';
import NinixLogAction from '../Redux/NinixLogRedux';
import ModelToJson from '../Transform/ModelToJson';
import Response from '../Services/Response';

export function* didConnect(api, action) {
  const { ninixLog, auth } = yield select();
  yield syncConnectionLogs(api, ninixLog, auth);
  // yield put(NinixLogAction.syncWithServer())
}

export function* didDisconnect(api, action) {
  const { ninixLog, auth } = yield select();
  yield syncConnectionLogs(api, ninixLog, auth);
  // yield put(NinixLogAction.syncWithServer())
}

export function* saveError(api, action) {
  const { ninixLog, auth } = yield select();
  yield syncErrorLog(api, ninixLog, auth);
  // yield put(NinixLogAction.syncWithServer())
}

export function* syncWithServer(api, action) {
  const { ninixLog, auth } = yield select();
  yield syncConnectionLogs(api, ninixLog, auth);
  yield syncErrorLog(api, ninixLog, auth);
}

export function* syncErrorLog(api, ninixLog, auth) {
  const errors = ninixLog.errors;
  const data = Object.keys(errors)
    .map(key => errors[key])
    .map(ModelToJson.errorLog);
  if (!data.length) {
    return;
  }
  const response = yield call(
    api.sendNinixErrorLog,
    { data },
    auth.accessToken
  );
  try {
    const result = yield call(Response.resolve, response);
    // TODO: we should getting id's from response
    yield put(NinixLogAction.didSyncErrorLogs(Object.keys(errors)));
  } catch (e) {
    console.tron.log({ log: 'error to sending errors log', error: e.message });
  }
}

export function* syncConnectionLogs(api, ninixLog, auth) {
  const connections = ninixLog.connections;
  const data = Object.keys(connections)
    .map(key => connections[key])
    .map(ModelToJson.connectivityLog);
  if (!data.length) {
    return;
  }
  const response = yield call(
    api.sendConnectionLogs,
    { logs: data },
    auth.accessToken
  );
  try {
    const result = yield call(Response.resolve, response);
    // TODO: we should getting id's from response
    yield put(NinixLogAction.didSyncConnections(Object.keys(connections)));
  } catch (e) {
    console.tron.log({
      log: 'error to sending connection log',
      error: e.message,
    });
  }
}
