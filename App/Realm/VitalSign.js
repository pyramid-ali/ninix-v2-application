class VitalSign {

}

VitalSign.schema = {
  name: 'VitalSign',
  properties: {
    temperature: 'float',
    respiratory: 'int',
    orientation: 'int',
    humidity: 'int',
    registerAt: 'date'
  }
}

export default VitalSign
