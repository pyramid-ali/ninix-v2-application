import { BleManager } from 'react-native-ble-plx'

class Ble {

  constructor () {
    this.manager = new BleManager()
  }

  addListener (listener, emitCurrentState = true) {
    this.subscription = this.manager.onStateChange(listener, emitCurrentState)
  }

  removeListener () {
    this.subscription.remove()
  }

  scanDevice(uuidArray, options, listener) {
    return this.manager.startDeviceScan(uuidArray, options, listener)
  }

  stopScan () {
    this.manager.stopDeviceScan()
  }

  state () {
    return this.manager.state()
  }

  disconnect (device) {
    return this.manager.cancelDeviceConnection(device.id)
  }

}

const instance = new Ble()
Object.freeze(instance)

export default instance
