class DeviceInfo {

}

DeviceInfo.schema = {
  name: 'DeviceInfo',
  properties: {
    battery    : 'int',
    stored     : 'int',
    fullCharged: 'bool',
    charging   : 'bool',
    lowBattery : 'bool',
    registerAt : 'int'
  }
}

export default DeviceInfo
