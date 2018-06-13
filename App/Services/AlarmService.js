import moment from 'moment'
import PushNotification from 'react-native-push-notification-ce'

const receive = (alarms, newAlarm) => {
  const types = ['temperature', 'respiratory', 'orientation']
  return types.map(type => analyze(alarms, newAlarm, type)).reduce((acc, curr, index) => ({...acc, [types[index]]: curr}), {})
}

function analyze (alarms, newAlarm, type) {
  const now = moment().unix()
  if (newAlarm[type]) {
    const index = Math.max(Object.keys(alarms[type]))
    const item = alarms[type][index]

    if (item && index + item.repeat <= now) {
      return {
        [index] : {type, repeat: item.repeat + 1, registerAt: moment(index * 1000)}
      }
    }

    PushNotification.localNotification({
      title: "Warning, your baby may be in danger", // (optional)
      message: "check your baby " + type,
      soundName: 'samsung_galaxy_best.mp3'
    })

    return {
      [now] : {type, repeat: 1, registerAt: moment(index * 1000)}
    }

  }

  return {}
}

export default {
  receive
}
