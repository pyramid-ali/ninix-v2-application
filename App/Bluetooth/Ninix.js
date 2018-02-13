import UUID from './UUID'
import DataHandler from './DataHandler'
const base64 = require('base-64')

export default class Ninix {

  constructor (device) {
    this.device = device
  }

  async discover () {
    this.device = await this.device.discoverAllServicesAndCharacteristics()
    if (this.device) {
      await this.getServices()
      await this.getCharacteristics()
      return
    }
    throw new Error('cannot discover services and characteristics')
  }

  async disconnect () {
    return await this.device.disconnect()
  }

  async getServices () {
    const services = await this.device.services()
    this.services = services.reduce((services, service) => {
      return {...services, [service.id]: {service}}
    })
  }

  async getCharacteristics () {
    await Promise.all(Object.keys(this.services).map(async (id) => {
      const service = this.services[id].service
      if (service) {
        const characteristics = await service.characteristics()
        this.services[id].characteristics = characteristics
        this.assignCharacteristics(characteristics)
      }
    }))
  }

  assignCharacteristics (characteristics) {
    characteristics.forEach((characteristic) => {
      switch (characteristic.uuid) {
        case UUID.services.main.chars.stream:
          this.streamCharacteristic = characteristic
          break;
        case UUID.services.main.chars.command:
          this.commandCharacteristic = characteristic
            break;
        case UUID.services.main.chars.synchronize:
          this.syncCharacteristic = characteristic
          break;
      }
    })
  }

  async bond () {
    return await this.commandCharacteristic.read()
  }

  stream (listener) {
    if (this.streamCharacteristic) {
      return this.streamCharacteristic.monitor((error, char) => {
        if (char) {
          let str = base64.decode(char.value)
          let bytes = []
          for (let i = 0; i < str.length; ++i) {
            const code = str.charCodeAt(i)
            bytes = bytes.concat([code])
          }
          console.tron.log({bytes})
          const result = DataHandler.stream(bytes)
          listener(result)
        }
      })
    }
  }


}


