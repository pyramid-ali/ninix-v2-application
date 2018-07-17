import Realm from 'realm';
import { Alarm } from './Alarm';
import { VitalSign } from './VitalSign';

export const write = (write, error = () => {}) => {
  Realm.open({ schema: [VitalSign, Alarm] })
    .then(realm => {
      realm.write(() => write(realm));
    })
    .catch(e => error(e));
};

export const read = (read, error = () => {}) => {
  Realm.open({ schema: [VitalSign, Alarm] })
    .then(read)
    .catch(e => error(e));
};

export default {
  write,
  read,
};

// export default class Storage {
//
//
//
//   // static save (data) {
//   //
//   //   Realm.open({schema: schemas})
//   //     .then(realm => {
//   //
//   //       const model = realm.objects('VitalSign').sorted('registerAt', true)[0]
//   //
//   //       realm.write(() => {
//   //         compare(data, model) ? model.repeat += 1 : realm.create('VitalSign', data)
//   //       })
//   //
//   //   })
//   //     .catch(error => console.tron.log({
//   //       error, place: 'Realm/Storage/save',
//   //       message: error.message
//   //     }))
//   // }
//
//   // static saveArray (dataArray)  {
//   //   Realm.open({schema: schemas})
//   //     .then(realm => {
//   //
//   //       realm.write(() => {
//   //         dataArray.forEach((data) => {
//   //           const model = realm.objects('VitalSign').sorted('registerAt', true)[0]
//   //           compare(data, model) ? model.repeat += 1 : realm.create('VitalSign', data)
//   //         })
//   //       })
//   //
//   //     })
//   //     .catch(error => console.tron.log({
//   //       error, place: 'Realm/Storage/get',
//   //       message: error.message
//   //     }))
//   // }
//   //
//   // static saveTemporarily(dataArray) {
//   //   Realm.open({schema: schemas})
//   //     .then(realm => {
//   //
//   //       realm.write(() => {
//   //         dataArray.forEach(data => realm.create('TempVitalSign', data))
//   //       })
//   //
//   //     })
//   //     .catch(error => console.tron.log({
//   //       error, place: 'Realm/Storage/saveTemp',
//   //       message: error.message
//   //     }))
//   // }
//   //
//   // static removeTemp (dataArray) {
//   //   Realm.open({schema: schemas})
//   //     .then(realm => {
//   //
//   //       realm.write(() => {
//   //         realm.delete(dataArray)
//   //       })
//   //
//   //     })
//   //     .catch(error => console.tron.log({
//   //       error, place: 'Realm/Storage/removeTemp',
//   //       message: error.message
//   //     }))
//   // }
//   //
//   // static getTemp () {
//   //   return Realm.open({schema: schemas})
//   //     .then(realm => {
//   //
//   //       let vitalSigns = realm.objects('TempVitalSign').sorted('registerAt', true)
//   //       console.tron.log({
//   //         vitalSigns
//   //       })
//   //       return vitalSigns
//   //     })
//   //     .catch(error => console.tron.error({
//   //       error,
//   //       place: 'Realm/Storage/get',
//   //       message: error.message
//   //     }))
//   // }
//   //
//   // static get () {
//   //   Realm.open({schema: schemas})
//   //     .then(realm => {
//   //       let vitalSigns = realm.objects('VitalSign').sorted('registerAt', true)
//   //       console.tron.log({
//   //         vitalSigns
//   //       })
//   //     })
//   //     .catch(error => console.tron.error({
//   //       error,
//   //       place: 'Realm/Storage/get',
//   //       message: error.message
//   //     }))
//   // }
//
// }
//
// function compare (data, reference) {
//   const keys = [ 'respiratory', 'humidity', 'orientation']
//
//   return _.isEqual(
//     _.pick(data, keys),
//     _.pick(reference, keys)
//   ) &&
//     Math.round(data.temperature * 10) === Math.round(reference.temperature * 10) &&
//     Math.abs(data.registerAt - reference.registerAt - reference.repeat) <= 1
// }
