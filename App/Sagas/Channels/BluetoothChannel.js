// Libraries
import { eventChannel, END } from 'redux-saga';
import { put, take, select } from 'redux-saga/effects';

// Dependencies
import BluetoothAction from '../../Redux/BluetoothRedux';
import CentralManager from '../../Bluetooth/CentralManager';
import FirmwareAction from '../../Redux/FirmwareRedux';
import NinixLogAction from '../../Redux/NinixLogRedux';

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

export function setupScanListenerChannel() {
  return eventChannel(emit => {
    const listener = state => {
      emit(state);
    };
    CentralManager.scanForDevices(listener);
    return () => {
      CentralManager.stopScan();
    };
  });
}

export function* setupBluetoothConnectionListener(channel) {
  try {
    while (true) {
      const { error, device } = yield take(channel);
      const state = yield select();
      if (state.firmware.updating) {
        yield put(FirmwareAction.update());
      }
      yield put(NinixLogAction.didDisconnect({ ...state.ninix }));
      if (CentralManager.forceDisconnect || state.firmware.updating) {
        yield put(BluetoothAction.didDisconnect());
        CentralManager.forceDisconnect = false;
        CentralManager.tries = 0;
      } else {
        if (CentralManager.tries <= 3) {
          yield put(BluetoothAction.connect(device));
        } else {
          yield put(
            BluetoothAction.didFail(
              error ? error.message : 'Please clear bound information'
            )
          );
          CentralManager.tries = 0;
        }
      }
    }
  } finally {
    console.tron.log({ log: 'end of disconnect listener' });
  }
}

export function setupBluetoothConnectionListenerChannel(device) {
  return eventChannel(emit => {
    const listener = (error, device) => {
      emit({ error, device });
      // because every time we connect to a device we set a listener for it, then we don't need previous listener
      emit(END);
    };
    const subscription = device.onDisconnected(listener);
    return () => {
      subscription.remove();
    };
  });
}
