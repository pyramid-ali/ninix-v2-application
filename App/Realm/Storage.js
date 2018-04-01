import VitalSign from './VitalSign'
import _ from 'lodash'
import TempVitalSign from './TempVitalSign';
const Realm = require('realm')


export const schemas = [
  VitalSign,
  TempVitalSign
]

export default class Storage {

  static save (data) {

    Realm.open({schema: schemas})
      .then(realm => {

        const model = realm.objects('VitalSign').sorted('registerAt', true)[0]

        realm.write(() => {
          compare(data, model) ? model.repeat += 1 : realm.create('VitalSign', data)
        })

    })
      .catch(error => console.tron.log({
        error, place: 'Realm/Storage/save',
        message: error.message
      }))
  }

  static saveArray (dataArray) {
    Realm.open({schema: schemas})
      .then(realm => {

        realm.write(() => {
          dataArray.forEach((data) => {
            const model = realm.objects('VitalSign').sorted('registerAt', true)[0]
            compare(data, model) ? model.repeat += 1 : realm.create('VitalSign', data)
          })
        })

      })
      .catch(error => console.tron.log({
        error, place: 'Realm/Storage/get',
        message: error.message
      }))
  }

  static saveTemporarily(dataArray) {
    Realm.open({schema: schemas})
      .then(realm => {

        realm.write(() => {
          dataArray.forEach(data => realm.create('TempVitalSign', data))
        })

      })
      .catch(error => console.tron.log({
        error, place: 'Realm/Storage/saveTemp',
        message: error.message
      }))
  }

  static removeTemp (dataArray) {
    Realm.open({schema: schemas})
      .then(realm => {

        realm.write(() => {
          realm.delete(dataArray)
        })

      })
      .catch(error => console.tron.log({
        error, place: 'Realm/Storage/removeTemp',
        message: error.message
      }))
  }

  static getTemp () {
    return Realm.open({schema: schemas})
      .then(realm => {

        let vitalSigns = realm.objects('TempVitalSign').sorted('registerAt', true)
        console.tron.log({
          vitalSigns
        })
        return vitalSigns
      })
      .catch(error => console.tron.error({
        error,
        place: 'Realm/Storage/get',
        message: error.message
      }))
  }

  static get () {
    Realm.open({schema: schemas})
      .then(realm => {
        let vitalSigns = realm.objects('VitalSign').sorted('registerAt', true)
        console.tron.log({
          vitalSigns
        })
      })
      .catch(error => console.tron.error({
        error,
        place: 'Realm/Storage/get',
        message: error.message
      }))
  }

}

function compare (data, refrence) {
  const keys = [ 'respiratory', 'humidity', 'orientation']

  return _.isEqual(
    _.pick(data, keys),
    _.pick(refrence, keys)
  ) &&
    Math.round(data.temperature * 10) === Math.round(refrence.temperature * 10) &&
    Math.abs(data.registerAt - refrence.registerAt - refrence.repeat) <= 1
}
