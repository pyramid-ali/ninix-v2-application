import _ from 'lodash'
import Storage from './Storage'

export class VitalSign {

  store (data) {
    Storage.write((realm) => {
      const lastRecord = realm.objects('VitalSign').sorted('registerAt', true)[0]
      this.compare(data, lastRecord) ? lastRecord.repeat += 1 : realm.create('VitalSign', data)
    },
    error => {
      console.tron.log({log: 'error saving vitalSign', error})
    })
  }

  storeArray (dataArray) {
    Storage.write((realm) => {
        dataArray.forEach(data => {
          const lastRecord = realm.objects('VitalSign').sorted('registerAt', true)[0]
          this.compare(data, lastRecord) ? lastRecord.repeat += 1 : realm.create('VitalSign', data)
        })
      },
      error => {
        console.tron.log({log: 'error saving vitalSign', error})
      })
  }

  read () {
    Storage.read(realm => {
      const records = realm.objects('VitalSign')
    },
    error => {
      console.tron.log({log: 'error reading vitalSign', error})
    })
  }

  compare (newRecord, lastRecord) {
    const keys = ['respiratory', 'humidity', 'orientation', 'respMagnitude']
    return _.isEqual(
      _.pick(newRecord, keys),
      _.pick(lastRecord, keys)
    ) &&
      Math.round(newRecord.temperature * 10) === Math.round(lastRecord.temperature * 10) &&
      Math.abs(newRecord.registerAt - lastRecord.registerAt - lastRecord.repeat) <= 1
  }

  removeAll() {
    Storage.write((realm) => {
        const all = realm.objects('VitalSign')
        realm.delete(all)
      },
      error => {
        console.tron.log({log: 'error saving alarm', error: error.message})
      })
  }

}

VitalSign.schema = {
  name: 'VitalSign',
  properties: {
    temperature: 'float',
    respiratory: 'int',
    orientation: 'int',
    humidity: 'int',
    respMagnitude: 'int?',
    repeat: {type: 'int' , default: 0},
    registerAt: 'int'
  }
}

export default vitalSign = new VitalSign()
