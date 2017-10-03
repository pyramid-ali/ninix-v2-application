import { put, call, select } from 'redux-saga/effects'
import BluetoothAction from '../Redux/BluetoothRedux'
import DataAction from '../Redux/DataRedux'
import {DataHandler} from '../Bluetooth/DataHandler'
import Storage from '../Realm/Storage'
import moment from 'moment'
import Api from '../Services/Api'
import DataModel from '../Models/DataModel'

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

export function *checkUnsyncedData(action) {

  const { data, accessAbility } = yield select()

  // don't do anything if internet connection is lost or data is syncing
  if (data.syncing || !accessAbility.isConnected) {
    return
  }

  // start data syncing, only true syncing flag
  yield put(DataAction.syncing())
  const { unSynced } = data
  console.log(unSynced, 'unsync data')
  // if no data is available for syncing, don't do anything
  if (unSynced.length === 0) {
    return
  }

  // if only one data is available check differences between updated at and register at,
  // if this time is bigger than 15 seconds sync with server
  if (unSynced.length === 1) {
    const temp = unSynced[0]
    if (moment(temp.updatedAt).diff(temp.registerAt, 'seconds') % 15 !== 0 || temp.sync) {
      return
    }
  }


  const api = Api.createAuthorized()
  const response = yield call(api.sendData, DataModel.toJsonArray(unSynced))
  console.log(response, 'unsync response data')
  if (response.ok) {
    Storage.sync(unSynced)
  }
  else {
    yield put(DataAction.finishSyncing())
  }

}
