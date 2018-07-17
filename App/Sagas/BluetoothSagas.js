// Libraries
import { put, call, fork, select } from 'redux-saga/effects';
import { PermissionsAndroid } from 'react-native';

// Dependencies
import { checkAndGetPermission } from '../Services/Permission';
import CentralManager from '../Bluetooth/CentralManager';
import BluetoothAction from '../Redux/BluetoothRedux';
import NinixAction from '../Redux/NinixRedux';
import Router from '../Navigation/Router';
import StreamListener from '../Services/StreamListener';
import AlarmListener from '../Services/AlarmListener';

// Listeners
import {
  setupScanListener,
  setupScanListenerChannel,
  setupBluetoothConnectionListener,
  setupBluetoothConnectionListenerChannel,
} from './Channels/BluetoothChannel';

export function* connect(action) {
  const { device } = action;
  try {
    const connectedDevice = yield call(
      [CentralManager, CentralManager.connect],
      device
    );
    yield put(BluetoothAction.didConnect(connectedDevice));
    CentralManager.stopScan();
  } catch (error) {
    yield put(BluetoothAction.didFail(error.message));
  }
}

export function* didConnect(action) {
  const { device } = action;
  yield fork(
    setupBluetoothConnectionListener,
    yield call(setupBluetoothConnectionListenerChannel, device)
  );
  yield put(BluetoothAction.setup(device));
}

export function* setup(action) {
  const { device } = action;
  const { auth } = yield select();
  const ninix = yield call([CentralManager, CentralManager.setup]);
  yield put(NinixAction.getInformation({ ninix, device }));
  StreamListener.listen(ninix, { accessToken: auth.accessToken });
  AlarmListener.listen(ninix);
  yield put(BluetoothAction.didSetup({ ninix, device }));
}

export function* didSetup(action) {
  const { ninix, device } = action.payload;
  const { nav } = yield select();
  if (nav.index >= 1) {
    if (nav.routes[nav.routes.length - 1].routeName === 'AddDevice') {
      yield put(Router.backFromAddDevice);
    }
  }
  // TODO: get device error log
  // TODO: send device log to server
}

export function* reconnect() {
  const { ninix } = yield select();
  yield put(BluetoothAction.connect(ninix.device));
}

export function* cancelConnection() {
  const device = yield call(
    CentralManager.cancelConnection.bind(CentralManager)
  );
  if (device) {
    yield put(BluetoothAction.didDisconnect());
  }
}

export function* disconnect() {
  try {
    yield CentralManager.disconnect();
  } catch (error) {
    yield put(BluetoothAction.didFail(error.message));
    console.tron.error({ log: 'disconnect', error, message: error.message });
  }
}

export function* startScan() {
  const granted = yield checkAndGetPermission(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  );
  if (granted) {
    yield fork(setupScanListener, yield call(setupScanListenerChannel));
  } else {
    yield put(BluetoothAction.stopScan());
    yield put(
      BluetoothAction.didFail(
        'For scanning new device we have to access to your location'
      )
    );
  }
}

export function* stopScan() {
  CentralManager.stopScan();
}

export function* turnOffDevice() {
  yield CentralManager.ninix.sendTurnOffDevice();
}
