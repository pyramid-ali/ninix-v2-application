export class DataHandler {

  constructor (data) {
    this.data = data
    this.rawData = this.extractData()
  }

  extractData () {
    const [
      empty,
      rawTemperature,
      rawOrientationAndHumidity,
      lowLevelBattery,
      highLevelBattery
    ] = this.data

    const rawRespiratory = this.data.slice(13, 17)

    return {
      rawRespiratory,
      rawTemperature,
      rawOrientationAndHumidity,
      lowLevelBattery,
      highLevelBattery
    }
  }

  getRespiratory () {
    const { rawRespiratory } = this.rawData
    const float = this.toFloat(rawRespiratory.reverse())
    const rounded = this.round(float)
    return rounded > 900 ? 0 : rounded
  }

  getTemperature () {
    const { rawTemperature } = this.rawData
    const a = rawTemperature * 32 + 26612
    return this.round((a * (175.72 / 65536) - 46.85), 1)
  }

  getOrientation () {
    const { rawOrientationAndHumidity } = this.rawData
    return this.round(rawOrientationAndHumidity & 0x03)
  }

  getHumidity () {
    const { rawOrientationAndHumidity } = this.rawData
    return  this.round((rawOrientationAndHumidity & 0x1c) >> 2)
  }

  getBattery () {
    const { lowLevelBattery, highLevelBattery } = this.rawData
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
    return Math.round((capacity / 80) * 100)
  }

  getExtractedData () {
    return {
      respiratory: this.getRespiratory(),
      temperature: this.getTemperature(),
      orientation: this.getOrientation(),
      humidity: this.getHumidity(),
      battery: this.getBattery()
    }
  }

  round (number, degree = 0) {
    return Math.round(number * Math.pow(10, degree)) / Math.pow(10, degree)
  }

  toFloat (data) {
    const buff = new ArrayBuffer(4)
    const view = new DataView(buff)
    data.forEach((b, i) => view.setUint8(i, b))
    return view.getFloat32(0)
  }

}
