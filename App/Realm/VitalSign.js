class VitalSign {

}

VitalSign.schema = {
  name: 'VitalSign',
  properties: {
    temperature: 'float',
    respiratory: 'int',
    orientation: 'int',
    humidity   : 'int',
    repeat     : {type: 'int' , default: 0},
    sync       : {type: 'bool' , default: false},
    registerAt : 'int'
  }
}

export default VitalSign
