import Storage from './Storage'

export class Alarm {

  store (data) {
    Storage.write((realm) => {
        const lastRecord = realm.objects('Alarm').filtered(`type = "${data.type}" AND registerAt = ${data.registerAt}`)
        this.isEmpty(lastRecord) ? realm.create('Alarm', data) : (lastRecord[0].repeat += 1, lastRecord[0].sync = false)
      },
      error => {
        console.tron.log({log: 'error saving alarm', error: error.message})
      })
  }

  read () {
    return new Promise((resolve, reject) => {
      Storage.read(realm => {
          resolve(realm.objects('Alarm').sorted('registerAt', true).slice(0,20))
        },
        error => {
          reject(error)
        })
    })
  }

  unsynced() {
    return new Promise((resolve, reject) => {
      Storage.read(realm => {
          resolve(realm.objects('Alarm').filtered('sync = false'))
        },
        error => {
          reject(error)
        })
    })
  }

  sync(data) {
    Storage.write((realm) => {
        data.forEach(item => {
          const lastRecord = realm.objects('Alarm').filtered(`type = "${item.type}" AND registerAt = ${item.registerAt}`)
          if (!this.isEmpty(lastRecord)) {
            lastRecord[0].sync = true
          }
        })

      },
      error => {
        console.tron.log({log: 'error saving alarm', error: error.message})
      })
  }

  isEmpty(obj) {
    for(let key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  removeAll() {
    Storage.write((realm) => {
        const all = realm.objects('Alarm')
        realm.delete(all)
      },
      error => {
        console.tron.log({log: 'error saving alarm', error: error.message})
      })
  }

}

Alarm.schema = {
  name: 'Alarm',
  properties: {
    type: 'string',
    repeat: 'int',
    registerAt: 'int',
    sync: {type: 'bool' , default: false}
  }
}

export default alarm = new Alarm()
