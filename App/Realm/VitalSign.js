class VitalSign {

}

VitalSign.schema = {
  name: 'VitalSign',
  properties: {
    temperature: 'float',
    respiratory: 'int',
    orientation: 'int',
    humidity   : 'int',
    sync       : {type: 'bool' , default: false},
    updatedAt  : 'date',
    registerAt : 'date'
  }
}

export default VitalSign
