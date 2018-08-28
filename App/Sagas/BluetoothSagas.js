// Libraries
import { put, call, fork, select } from 'redux-saga/effects';
import {PermissionsAndroid, Platform} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

// Dependencies
import { checkAndGetPermission } from '../Services/Permission';
import CentralManager from '../Bluetooth/CentralManager';
import BluetoothAction from '../Redux/BluetoothRedux';
import NinixAction from '../Redux/NinixRedux';
import Router from '../Navigation/Router';
import NinixLogAction from "../Redux/NinixLogRedux";
import StreamListener from '../Services/StreamListener';
import AlarmListener from '../Services/AlarmListener';

// Listeners
import {
  setupScanListener,
  setupScanListenerChannel,
  setupBluetoothConnectionListener,
  setupBluetoothConnectionListenerChannel,
} from './Channels/BluetoothChannel';


/**
 * connect to selected device
 * @param action
 */
export function* connect(action) {
  try {
    const device = yield call(
      [CentralManager, CentralManager.connect],
      action.device
    );
    yield put(BluetoothAction.didConnect(device));
  }
  catch (error) {
    // TODO: we can change didFail to DidConnectFail
    yield put(BluetoothAction.didFail(error.message));
  }
  finally {
    CentralManager.stopScan();
  }
}

/**
 * setup ninix
 * get device information, ge error logs, setup listeners
 * @param action
 */
export function* setup(action) {
  const { device } = action;

  const ninix = yield call([CentralManager, CentralManager.setup], {device});

  const info = yield _getDeviceInformation(ninix)
  yield _getDeviceErrorLogs(ninix, info.serial)
  yield _setPacketListeners(ninix)

  yield put(BluetoothAction.didSetup({ ninix, device }));
  yield _saveConnectionLog(info, ninix)
}

/**
 * reconnect to last connected device
 */
export function* reconnect() {
  const { ninix } = yield select();
  yield put(BluetoothAction.connect(ninix.device));
}

/**
 * cancel connection, for when device is connecting
 */
export function* cancelConnection() {
  const device = yield call(
    CentralManager.cancelConnection.bind(CentralManager)
  );
  if (device) {
    yield put(BluetoothAction.didDisconnect());
  }
}

/**
 * disconnect
 */
export function* disconnect() {
  yield CentralManager.disconnect();
}

/**
 | -----------------------------------------------------------------------
 | ---------------------------- event listener ---------------------------
 | -----------------------------------------------------------------------
 */

/**
 * did device connect
 * add connection listener and setup device after connection
 * @param action
 */
export function* didConnect(action) {
  const { device } = action;

  yield fork(
    setupBluetoothConnectionListener,
    yield call(setupBluetoothConnectionListenerChannel, action.device)
  );

  yield put(BluetoothAction.setup(device));
}

/**
 * did disconnect
 */
export function* didDisconnect() {
  const { ninix } = yield select();
  yield put(NinixLogAction.didDisconnect({ ...ninix }))
}

/**
 * after setup ninix
 */
export function* didSetup() {

  const { nav } = yield select();
  if (nav.index >= 1) {
    if (nav.routes[nav.routes.length - 1].routeName === 'AddDevice') {
      yield put(Router.backFromAddDevice);
    }
  }

}

/**
 | -----------------------------------------------------------------------
 | ---------------------------- scan options -----------------------------
 | -----------------------------------------------------------------------
 */

/**
 * start scan
 */
export function* startScan() {
  const granted = yield checkAndGetPermission(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  );
  if (granted) {

    if (Platform.OS === 'android') {
      try {
        yield call(RNAndroidLocationEnabler.promptForEnableLocationIfNeeded, {interval: 10000, fastInterval: 5000});
      }
      catch (error) {
        yield put(
          BluetoothAction.didFail(
            'For scanning new devices you should enable location service'
          )
        );
        return
      }
    }
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

/**
 * stop scan
 */
export function* stopScan() {
  CentralManager.stopScan();
}

/**
 * turn off ninix
 */
export function* turnOffDevice() {
  yield CentralManager.ninix.turnOff();
}

/**
 * get device information
 * @param ninix
 * @private
 */
function* _getDeviceInformation(ninix) {
  const information = yield call([ninix, ninix.getInformation]);
  yield put(NinixAction.setInformation({...information, device: ninix.device}));
  return information;
}

/**
 * get device error logs
 * @param ninix
 * @param serial
 * @private
 */
function* _getDeviceErrorLogs(ninix, serial) {
  const errorLog = yield call([ninix, ninix.getErrorLog]);
  yield put(NinixLogAction.saveError({ body: errorLog, serial }));
  return errorLog;
}

/**
 * packet listener
 * @param ninix
 * @private
 */
function* _setPacketListeners(ninix) {
  StreamListener.listen(ninix);
  AlarmListener.listen(ninix);
}

function* _saveConnectionLog(information, ninix) {
  yield put(NinixLogAction.didConnect({...information, device: ninix.device}));
}
