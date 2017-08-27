import VitalSign from './VitalSign'
const Realm = require('realm')


const schema = [
  VitalSign
]

export default Realm.open(schema)
