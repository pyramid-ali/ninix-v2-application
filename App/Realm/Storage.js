import VitalSign from './VitalSign'
import _ from 'lodash'
const Realm = require('realm')


export const schemas = [
  VitalSign
]

export default class Storage {

  static save (data) {

    Realm.open({schema: schemas})
      .then(realm => {

        const model = realm.objects('VitalSign').sorted('registerAt', true)[0]

        realm.write(() => {
          console.tron.log({compare: compare(data, model)})
          compare(data, model) ? model.repeat += 1 : realm.create('VitalSign', data)
        })

    })
      .catch(error => console.tron.log({
        error, place: 'Realm/Storage/get',
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

function compare (first, second) {
  const keys = [ 'respiratory', 'humidity', 'orientation']

  return _.isEqual(
    _.pick(first, keys),
    _.pick(second, keys)
  ) &&
    Math.round(first.temperature * 10) === Math.round(second.temperature * 10) &&
    Math.abs(first.registerAt - second.registerAt) <= 1
}
