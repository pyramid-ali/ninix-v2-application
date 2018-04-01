import RealmStorage from '../Realm/Storage'
import { select, call, put } from 'redux-saga/effects'
import Response from '../Services/Response'
import moment from 'moment'
import DataAction from '../Redux/DataRedux'

export function *didReceiveData (api, action) {

  const { data } = action
  RealmStorage.save(data)
  yield sendDataToServer(api, data)


}

export function *sendDataToServer(api, newData) {

  const { auth, data } = yield select()
  if (data.temp.length) {
    if (data.temp[0].registerAt + 15 < moment().unix()) {
      const dataArray = [...data.temp, newData]
      yield put(DataAction.removeTemp())
      const response = yield call(api.sendData, {data: dataArray}, auth.accessToken)

      try {
        yield call(Response.resolve, response)
      }
      catch (error) {
        RealmStorage.saveTemporarily(dataArray)
      }
      return
    }
  }

  yield put(DataAction.saveTemp(newData))

}

export function *syncWithServer(api, action) {
  console.tron.log({log: 'sync with server called'})
  const { auth } = yield select()
  if (auth.accessToken) {
    const dataArray = yield call(RealmStorage.getTemp)
    if (dataArray.length > 0) {
      console.tron.log({log: 'sync with server', dataArray})
      const response = yield call(api.sendData, {data: dataArray}, auth.accessToken)
      try {

        yield call(Response.resolve, response)
        RealmStorage.removeTemp(dataArray)
        console.tron.log('success sync')
      }
      catch (error) {
        console.tron.log('failed to sync')
      }
    }

  }

}
