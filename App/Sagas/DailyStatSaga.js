import { select, call, put } from 'redux-saga/effects'
import ModelToJson from '../Transform/ModelToJson'
import Response from '../Services/Response'
import DailyStatAction from '../Redux/DailyStatRedux'
import JsonToModel from '../Transform/JsonToModel'
import _ from 'lodash'

export function *didAddNewRecord (api, action) {

  const { dailyStats, auth } = yield select()
  const unSyncedData = _.pickBy(dailyStats.data, item => !item.sync)
  const data = Object.keys(unSyncedData).map(index => unSyncedData[index]).map(item => ModelToJson.dailyStat(item))
  const response = yield call(api.updateDailyStat, data, auth.accessToken)
  try {
    const result = yield call(Response.resolve, response)
    put(DailyStatAction.update(result.daily_stats.map(item => JsonToModel.dailyStat(item))))
  }
  catch (error) {
    console.tron.log({error})
  }
}

export function *retrieveFromServer (api, action) {
  const { auth } = yield select()
  const response = yield call(api.getDailyStats, auth.accessToken)
  try {
    const result = yield call(Response.resolve, response)
    put(DailyStatAction.update(result.daily_stats.map(item => JsonToModel.dailyStat(item))))
  }
  catch (error) {
    console.tron.log({error})
  }
}

