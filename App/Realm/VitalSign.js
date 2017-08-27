class VitalSign {

}

VitalSign.schema = {
  name: 'VitalSign',
  primaryKey: 'id',
  properties: {
    id: 'int',
    temperature: 'float',
    respiratory: 'int',
    orientation: 'bool',
    humidity: 'int'
  }
}

export default VitalSign
