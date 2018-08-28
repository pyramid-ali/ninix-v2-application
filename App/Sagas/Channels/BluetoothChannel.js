// Libraries
import { eventChannel, END } from 'redux-saga';
import { put, take, select } from 'redux-saga/effects';

// Dependencies
import AppConfig from "../../Config/AppConfig";
import BluetoothAction from '../../Redux/BluetoothRedux';
import CentralManager from '../../Bluetooth/CentralManager';
import FirmwareAction from '../../Redux/FirmwareRedux';

/**
 * setup scan listener
 * @param channel
 */
export function* setupScanListener(channel) {
  try {
    while (true) {
      const devices = yield take(channel);
      yield put(BluetoothAction.didDiscover(devices));
    }
  } finally {
    console.tron.log({ log: 'setupScanListener finally' });
  }
}

/**
 * setup scan listener channel
 * @return {Channel<any>}
 */
export function setupScanListenerChannel() {
  return eventChannel(emit => {
    CentralManager.scanForDevices(state => emit(state));
    return () => {
      CentralManager.stopScan();
    };
  });
}

/**
 * setup bluetooth connection listener
 * @param channel
 */
export function* setupBluetoothConnectionListener(channel) {
  try {
    while (true) {
      const { error, device } = yield take(channel);
      const { bluetooth, firmware } = yield select()

      if (firmware.updating) {
        yield put(FirmwareAction.update());
      }

      if (!bluetooth.manualDisconnect && bluetooth.tries <= AppConfig.bluetooth.connectRetries) {
        yield put(BluetoothAction.connect(device));
      }
      else {
        const message = error ? error.message : (bluetooth.tries > AppConfig.bluetooth.connectRetries) ? 'Please clear bound information' : null;
        yield put(BluetoothAction.didDisconnect(message));
      }

    }
  } finally {
    console.tron.log({ log: 'end of disconnect listener' });
  }
}

/**
 * setup bluetooth connection listener channel
 * @param device
 * @return {Channel<any>}
 */
export function setupBluetoothConnectionListenerChannel(device) {
  return eventChannel(emit => {

    const subscription =
      device.onDisconnected((error, device) => {
        emit({ error, device });
        emit(END);
      });

    return () => subscription.remove();

  });
}
