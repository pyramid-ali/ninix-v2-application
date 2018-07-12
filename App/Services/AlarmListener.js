import PushNotification from 'react-native-push-notification-ce'
import { Subject } from 'rxjs'
import moment from 'moment'

import ModelToJson from '../Transform/ModelToJson'
import Alarm from '../Realm/Alarm'
import { store } from '../Containers/App'
import Api from './Api'


class AlarmListener {

  constructor() {
    this.subjcet = new Subject()
    this.alarms = {
      temperature: {},
      respiratory: {},
      orientation: {}
    }
    this.timer = null
    this.api = Api.create()
  }

  listen(ninix) {
    this.listener && this.listener.remove()
    this.listener = ninix.alarmListener((alarm) => {
      if (this.timer) {
        this.timer += 1
      } else {
        this.timer = moment().unix()
      }
      this.saveAlarm(alarm, this.timer)
    })
  }

  subscribe(...args) {
    return this.subjcet.subscribe(...args)
  }

  saveAlarm(alarm, timer) {
    let needSync = false
    Object.keys(alarm).filter(key => alarm[key] === true).forEach(key => {
      needSync = true
      const alarms = this.alarms[key]
      const lastAlarm = alarms[Math.max(...Object.keys(alarms))]
      let id = timer - (lastAlarm ? lastAlarm.repeat : 0)
      const previous = alarms[id]
      let result
      if (previous) {
        result = {...previous, repeat: previous.repeat + 1}
      }
      else {
        id = timer
        result = {registerAt: id, type: key, repeat: 1}
        this.localNotification(key)
        this.subjcet.next(result)
      }

      this.save(result)
      this.alarms = {
        ...this.alarms,
        [key]: {
          ...alarms,
          [id]: result
        }
      }
    })
    needSync && this.syncWithServer()
  }

  save(data) {
    Alarm.store(data)
  }

  localNotification(type) {
    PushNotification.localNotification({
      title: "Warning, your baby may be in danger", // (optional)
      message: "check your baby " + type,
      soundName: 'samsung_galaxy_best.mp3'
    })
  }

  syncWithServer() {

    const unsynced = Alarm.unsynced()
    const data = Object.keys(unsynced).map(key => unsynced[key])
    const { auth } = store.getState()
    this.api.sendAlarms(data.map(ModelToJson.alarm), auth.accessToken).then(resp => {
      Response.resolve(resp).then(result => {
        Alarm.sync(data)
      })
    })
  }

}

export default AlarmListener = new AlarmListener()
