import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { mainService } from '../Bluetooth/UUID'
import BluetoothAction from '../Redux/BluetoothRedux'
import DataAction from '../Redux/DataRedux'
import Connector from '../Bluetooth/Connector'
import Ble from '../Services/Ble'
import {DataHandler} from '../Bluetooth/DataHandler'
import Storage from '../Realm/Storage'

export function *receiveData(action) {

  const { data, time } = action
  const registerAt = new Date(time * 1000)
  const handler = yield new DataHandler(data)
  const values = yield handler.getExtractedData()
  yield put(BluetoothAction.updateBattery(values.battery))
  yield put(DataAction.extractData({...values, registerAt}))
  try {
    Storage.save(values, registerAt)
  }
  catch (error) {
    console.log(error, 'error data sagas')
  }

}
