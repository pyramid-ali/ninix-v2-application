import Storage from './Storage'

export class Alarm {

  store (data) {
    Storage.write((realm) => {
        const lastRecord = realm.objects('Alarm').filtered(`type = "${data.type}" AND registerAt = ${data.registerAt}`)
        this.isEmpty(lastRecord) ? realm.create('Alarm', data) : lastRecord[0].repeat += 1
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
    registerAt: 'int'
  }
}

export default alarm = new Alarm()
