import UUID from './UUID'
import DataHandler from './DataHandler'
import { Base64 } from 'js-base64'
import Commands from './Commands'

export default class Ninix {

  constructor (device) {
    this.device = device
  }

  async discover () {
    try {
      this.device = await this.device.discoverAllServicesAndCharacteristics()
      await this.getServices()
      await this.getCharacteristics()
    }
    catch (error) {
      throw new Error(error.message)
    }
  }

  async disconnect () {
    return await this.device.cancelConnection()
  }

  async getServices () {
    const services = await this.device.services()
    this.services = services.reduce((services, service) => {
      return {...services, [service.id]: {service}}
    })
  }

  async getCharacteristics () {
    await asyncForEach(Object.keys(this.services), async (id) => {
      const service = this.services[id].service
      if (service) {
        const characteristics = await service.characteristics()
        this.services[id].characteristics = characteristics
        this.assignCharacteristics(characteristics)
      }
    })
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
    return this.streamCharacteristic.monitor((error, char) => {
      if (char) {
        const bytes = this.getCharacteristicBytes(char)
        const result = DataHandler.stream(bytes)
        listener(result)
      }
    })
  }

  sync (listener) {
    return this.syncCharacteristic.monitor((error, char) => {
      if (char) {
        const bytes = this.getCharacteristicBytes(char)
        const result = DataHandler.sync(bytes)
        listener(result)
      }
    })
  }

  getCharacteristicBytes (char) {
    let str = Base64.decode(char.value)
    let bytes = []
    for (let i = 0; i < str.length; ++i) {
      const code = str.charCodeAt(i)
      bytes = bytes.concat([code])
    }
    return bytes
  }

  async sendSyncCommand () {
    await this.sendCommand(Commands.startSync)
  }

  async sendAlarmCommand () {
    await this.sendCommand(Commands.alarm)
  }

  async sendCommand (command) {
    const value = String.fromCharCode(command)
    const data = Base64.encode(value)
    return await this.commandCharacteristic.writeWithResponse(data)
  }

}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

