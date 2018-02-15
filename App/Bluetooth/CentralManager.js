import { BleManager } from 'react-native-ble-plx'
import UUID from './UUID'
import moment from 'moment'
import Ninix from './Ninix'
import _ from 'lodash'

class CentralManager {

  scannedDevices = []

  constructor () {
    this.manager = new BleManager()
    this.period = 15
  }

  timer () {
     return setInterval(
      () => {
        Object.keys(this.scannedDevices).forEach((item) => {
          if (moment().diff(this.scannedDevices[item].time, 's') > 30) {
            delete this.scannedDevices[item]
          }
        })
      }, this.period * 1000
    )
  }

  scanForDevices (listener) {

    this.timerSubscription = this.timer()
    this.manager.startDeviceScan([UUID.services.main.uuid], { allowDuplicates: true}, (error, device) => {
      const oldScannedDevices = this.scannedDevices
      this.scannedDevices = {...oldScannedDevices, [device.id]: {device, time: moment()}}
      if (!_.isEqual(Object.keys(oldScannedDevices), Object.keys(this.scannedDevices))) {
        listener(device)
      }
    })

  }

  stopScan () {
    this.manager.stopDeviceScan()
    this.scannedDevices = []
    clearInterval(this.timerSubscription)
  }

  async connect (device) {
    const connected = await device.connect({ autoConnect: true })
    this.ninix = new Ninix(connected)
    await this.ninix.discover()
    this.stopScan()
    return this.ninix
  }

  async disconnect () {
    const device = await this.ninix.disconnect()
    if (device) {
      return
    }
    throw new Error('Cannot disconnect from device')
  }

  onDisconnected (listener) {
    return this.ninix.device.onDisconnected((error, device) => {
      listener(error, device)
    })
  }

  addStateListener (listener, emitCurrentState = true) {
    return this.manager.onStateChange(listener, emitCurrentState)
  }

}

CentralManager.sharedInstance = null

CentralManager.getInstance = () => {
  if (CentralManager.sharedInstance) {
    return CentralManager.sharedInstance
  }
  return new CentralManager()
}

const centralManager = CentralManager.getInstance()

export default centralManager
