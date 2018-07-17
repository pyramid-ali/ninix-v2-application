class TempVitalSign {}

TempVitalSign.schema = {
  name: 'TempVitalSign',
  properties: {
    temperature: 'float',
    respiratory: 'int',
    orientation: 'int',
    humidity: 'int',
    registerAt: 'int',
  },
};

export default TempVitalSign;
