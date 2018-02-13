import moment from 'moment'

function stream (data) {
  const temperature = getTemperature(data[0])
  const humidity = getHumidity(data[1])
  const orientation = getOrientation(data[1])
  const battery = getBattery(data[2], data[3])
  const respiratory = getRespiratory(data.slice(4, 8))
  const stared = getStared(data[8], data[9])
  const fullCharged = isFullCharge(data[10])
  const charging = isCharging(data[11])
  const lowBattery = isOnLowBattery(data[12])
  const registerAt = moment().unix()

  return {
    temperature,
    humidity,
    orientation,
    battery,
    respiratory,
    stared,
    fullCharged,
    charging,
    lowBattery,
    registerAt
  }

}

function sync (data) {
  const size = 4
  const period = 5
  const unix = toSignInteger(data.slice(16, 20))
  let result = []
  for (let i = 0; i < size; i++) {
    const respiratory = 1 // TODO: this should be correct
    const temperature = getTemperature(data[i + 4])
    const humidity = getHumidity(data[i + 8])
    const orientation = getOrientation(data[i + 8])
    const registerAt = unix - ((size - i) * period)

    result.push({
      respiratory,
      temperature,
      humidity,
      orientation,
      registerAt
    })
  }

  return result

}

function round (number, degree = 0) {
  return Math.round(number * Math.pow(10, degree)) / Math.pow(10, degree)
}

function toFloat (data) {
  const buff = new ArrayBuffer(4)
  const view = new DataView(buff)
  data.forEach((b, i) => view.setUint8(i, b))
  return view.getFloat32(0)
}

function getTemperature (decimal) {
  const result = decimal * 32 + 26612
  return round((result * (175.72 / 65536) - 46.85), 1)
}

function getHumidity (decimal) {
  return round((decimal & 0x1c) >> 2)
}

function getOrientation (decimal) {
  return round(decimal & 0x03)
}

function getBattery (lowLevelBattery, highLevelBattery) {
  let battery = 3.6 * ((highLevelBattery * 256 + lowLevelBattery) / 512)
  battery = battery < 4.2 ? battery : 4.2
  const a1 = 7.982
  const b1 = 4.217
  const c1 = 0.007831
  const a2 = 0.02887
  const b2 = 4.151
  const c2 = 0.001352
  const a3 = 95.38
  const b3 = 4.308
  const c3 = 0.2244
  let capacity = (
    a1 * Math.exp(-Math.pow(((battery - b1) / c1), 2)) +
    a2 * Math.exp(-Math.pow(((battery - b2) / c2), 2)) +
    a3 * Math.exp(-Math.pow(((battery - b3) / c3), 2))
  )
  capacity = capacity < 80 ? capacity : 80
  return round((capacity / 80) * 100)
}

function getRespiratory (respiratoryBytes) {
  const float = toFloat(respiratoryBytes.reverse())
  const rounded = round(float)
  return rounded > 900 ? 0 : rounded
}

function getStared (lowByte, highByte) {
  return highByte * 256 + lowByte
}

function isFullCharge (decimal) {
  return castToBoolean(decimal)
}

function isCharging (decimal) {
  return castToBoolean(decimal)
}

function isOnLowBattery (decimal) {
  return castToBoolean(decimal)
}

function castToBoolean (decimal) {
  return decimal > 0
}

function toSignInteger (bytes) {
  return bytes[3] |
         bytes[2] << 8 |
         bytes[1] << 16 |
         bytes[0] << 24
}

export default {
  stream,
  sync
}
