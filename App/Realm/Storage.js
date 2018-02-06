import VitalSign from './VitalSign'
import moment from 'moment'
const Realm = require('realm')
import DataAction from '../Redux/DataRedux'
import { store } from '../Containers/App'


export const schemas = [
  VitalSign
]

export default class Storage {

  static save (data, registerAt) {
    const { temperature, respiratory, orientation, humidity } = data

    Realm.open({schema: schemas})
      .then(realm => {
        let vitalSign = realm.objects('VitalSign').sorted('updatedAt', true)[0]

        if (vitalSign) {
          const diffTime = moment(registerAt).diff(moment(vitalSign.updatedAt), 'seconds')

          if (diffTime === 0) {
            return
          }

          if (temperature === vitalSign.temperature &&
              respiratory === vitalSign.respiratory &&
              orientation === vitalSign.orientation &&
              humidity    === vitalSign.humidity    &&
              diffTime    === 1
          ) {

            realm.write(() => {
              vitalSign.updatedAt = registerAt
              vitalSign.sync = false
            })

            store.dispatch(DataAction.receiveUnsyncData(vitalSign))
            return
          }
        }

        realm.write(() => {
          vitalSign = realm.create('VitalSign', {
            temperature,
            respiratory,
            orientation,
            humidity,
            updatedAt: registerAt,
            registerAt
          })
        })

        store.dispatch(DataAction.receiveUnsyncData(vitalSign))
    })
      .catch(error => console.tron.log(error, '<Storage#save> catch error'))
  }

  static get () {
    Realm.open({schema: schemas})
      .then(realm => {
        let vitalSigns = realm.objects('VitalSign').sorted('updatedAt', true)
        console.tron.log({
          vitalSigns
        })
      })
      .catch(error => console.tron.error({
        error,
        place: 'Realm/Storage/get'
      }))
  }

  static sync (vitalSigns) {
    Realm.open({schema: schemas})
      .then(realm => {
        vitalSigns.forEach((vitalSign) => {
          realm.write(() => {
            vitalSign.sync = true
          })
          store.dispatch(DataAction.syncData(vitalSign))
        })
        store.dispatch(DataAction.finishSyncing())
      })
      .catch(error => console.tron.log(error, '<Storage#save> catch error'))
  }

}
