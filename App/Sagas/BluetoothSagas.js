import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { mainService } from '../Bluetooth/UUID'
import BluetoothAction from '../Redux/BluetoothRedux'
import Connector from '../Bluetooth/Connector'
import Ble from '../Services/Ble'

export function *connect(action) {

  try {
    const { device } = action
    Ble.stopScan()
    yield delay(500)
    const connectedDevice = yield call(Connector.connect, device)
    const discoveredServicesDevice = yield call(Connector.discover, connectedDevice)
    const services = yield call(Connector.services, discoveredServicesDevice)

    for (let i = 0; i < services.length; i++) {
      const service = services[i]
      if (service.uuid === mainService) {
        const characteristics = yield call(Connector.characteristicsForService, discoveredServicesDevice)
        for (let j = 0; j < characteristics.length; j++) {
          const characteristic = characteristics[j]
          yield call(Connector.notify, characteristic)
        }
      }
    }

    yield put(BluetoothAction.successConnect(device))
  }

  catch (e) {
    yield put(BluetoothAction.cancelConnection())
    console.log(e.getMessage(), e, 'bluetooth error in bluetoothSagas')
  }

}
