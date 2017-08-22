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
    console.log(device, '<BluetoothSagas#connect>')
    const connectedDevice = yield call(Connector.connect, device)
    console.log(connectedDevice, '<BluetoothSagas#connect>', 'connected device')
    const discoveredServicesDevice = yield call(Connector.discover, connectedDevice)
    console.log(discoveredServicesDevice, '<BluetoothSagas#connect>', 'discoverd services device')
    const services = yield call(Connector.services, discoveredServicesDevice)
    console.log(services, '<BluetoothSagas#connect>', 'services')
    for (let i = 0; i < services.length; i++) {
      const service = services[i]
      console.log(service, 'serivce')
      if (service.uuid === mainService) {
        const characteristics = yield call(Connector.characteristicsForService, discoveredServicesDevice)
        for (let j = 0; j < characteristics.length; j++) {
          const characteristic = characteristics[j]
          console.log(characteristic, 'characteristic')
          yield call(Connector.notify, characteristic)
        }
      }
    }

    yield put(BluetoothAction.successConnect(device))
    console.log('end')
  }
  catch (e) {
    console.log(e, 'scan stop')
    yield put(BluetoothAction.cancelConnection())
  }

}
