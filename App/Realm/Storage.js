import VitalSign from './VitalSign'
const Realm = require('realm')


export const schemas = [
  VitalSign
]

export default class Storage {

  static save (data, registerAt) {
    const { temperature, respiratory, orientation, humidity } = data

    Realm.open({schema: schemas})
      .then(realm => {
        realm.write(() => {
          realm.create('VitalSign', {
            temperature,
            respiratory,
            orientation,
            humidity,
            registerAt
          })
        })

    })
      .catch(error => console.log(error, '<Storage#save> catch error'))
  }

}
