import PushNotification from 'react-native-push-notification-ce'
import { Subject } from 'rxjs'
import moment from 'moment'

import Alarm from '../Realm/Alarm'

class AlarmListener {

  constructor() {
    this.subjcet = new Subject()
    this.alarms = {
      temperature: {},
      respiratory: {},
      orientation: {}
    }
    this.timer = null
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
    Object.keys(alarm).filter(key => alarm[key] === true).forEach(key => {
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

}

export default AlarmListener = new AlarmListener()
