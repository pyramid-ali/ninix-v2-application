import moment from 'moment'

function stream (data) {

  const temperature = getTemperature(data[0])
  const humidity = getHumidity(data[1])
  const orientation = getOrientation(data[1])
  const battery = getBattery(data[2], data[3], data[11])
  const respiratory = getRespiratory(data.slice(4, 8))
  const flashStore = haveFlashStore(data[8])
  const ramStore = haveFlashStore(data[9])
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
    flashStore,
    ramStore,
    fullCharged,
    charging,
    lowBattery,
    registerAt
  }

}

function sync (data, diffTime) {
  // TODO: we should hold size and period in different place for global access
  const size = 4
  const period = 5
  const unix = toSignInteger(data.slice(16, 20)) + diffTime
  let result = []
  for (let i = 0; i < size; i++) {
    const respiratory = data[i]
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

  // we used reverse to sort array in ascending order of registerAt
  // return mapSyncToStream(result.reverse())
  return result
}

// TODO: convert 5 second data to 1 second interval maybe perform at server
function mapSyncToStream (data) {

  const result = []

  for (let i = 0; i < data.length - 1; i++) {
    const current = data[i]
    const next = data[i + 1]

    const tempDiff = (next.temperature - current.temperature) / 5
    const respDiff = (next.respiratory - current.respiratory) / 5
    const orientationDiff = (next.orientation - current.orientation) / 5
    const humidityDiff = (next.humidity - current.humidity) / 5

    for (let j = 0; j < 5; j++) {
      result.push({
        temperature: round(current.temperature + (tempDiff * j)),
        respiratory: round(current.respiratory + (respDiff * j)),
        orientation: round(current.orientation + (orientationDiff * j)),
        humidity: round(current.humidity + (humidityDiff * j)),
        registerAt: current.registerAt + j
      })
    }

    return result
  }

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

function getBattery (lowLevelBattery, highLevelBattery, charging) {
  let battery = 3.6 * ((highLevelBattery * 256 + lowLevelBattery) / 512)
  battery = battery > 4.2 ? 4.2 : battery
  const percentage = charging ? getBatteryOnCharging(battery) : getBatteryOnDischarge(battery)
  return percentage > 100 ? 100 : percentage

}

function getBatteryOnCharging (battery) {
  const a1 = 13.01
  const b1 = 4.116
  const c1 = 0.04047
  const a2 = 27.46
  const b2 = 4.05
  const c2 = 0.04987
  const a3 = 21.02
  const b3 = 3.992
  const c3 = 0.03878
  const a4 = 30.56
  const b4 = 3.931
  const c4 = 0.05667
  const a5 = 1.301e+12
  const b5 = 17.75
  const c5 = 2.828
  const a6 = 37.93
  const b6 = 3.826
  const c6 = 0.08209

  let capacity = (
    a1 * Math.exp(-Math.pow(((battery - b1) / c1), 2)) +
    a2 * Math.exp(-Math.pow(((battery - b2) / c2), 2)) +
    a3 * Math.exp(-Math.pow(((battery - b3) / c3), 2)) +
    a4 * Math.exp(-Math.pow(((battery - b4) / c4), 2)) +
    a5 * Math.exp(-Math.pow(((battery - b5) / c5), 2)) +
    a6 * Math.exp(-Math.pow(((battery - b6) / c6), 2))
  )

  return round(capacity * 100 / 120)
}

function getBatteryOnDischarge (battery) {
  const a1 = 173.3
  const b1 = 4.398
  const c1 = 0.3742


  let capacity = (
    a1 * Math.exp(-Math.pow(((battery - b1) / c1), 2))
  )

  return round(capacity * 100 / 120)
}

function getRespiratory (respiratoryBytes) {
  const float = toFloat(respiratoryBytes.reverse())
  const rounded = round(float)
  return rounded > 900 ? 0 : rounded
}

function unreadData (lowByte, highByte) {
  return (highByte * 256) + lowByte
}

function haveFlashStore(decimal) {
  return castToBoolean(decimal)
}

function haveRamStore(decimal) {
  return castToBoolean(decimal)
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
