import { BleManager } from 'react-native-ble-plx'
import UUID from './UUID'
import moment from 'moment'
import Ninix from './Ninix'
import _ from 'lodash'

class CentralManager {

  device = null
  scannedDevices = []

  constructor () {
    this.manager = new BleManager()
    this.period = 15
  }

  timer () {
     return setInterval(
      () => {
        Object.keys(this.scannedDevices).forEach((item) => {
          if (moment().diff(this.scannedDevices[item].time, 's') > this.period) {
            delete this.scannedDevices[item]
          }
        })
      }, this.period * 1000
    )
  }

  scanForDevices (listener) {

    this.timerSubscription = this.timer()
    this.manager.startDeviceScan(
      [UUID.services.main.uuid],
      { allowDuplicates: true },
      (error, device) => {
        const oldScannedDevices = this.scannedDevices
        this.scannedDevices = {
          ...oldScannedDevices,
          [device.id]: {device, time: moment()}
        }
        // only if a new device scanned notify listener
        if (!_.isEqual(Object.keys(oldScannedDevices), Object.keys(this.scannedDevices))) {
          listener(device)
        }
      }
    )
  }

  stopScan () {
    this.manager.stopDeviceScan()
    this.scannedDevices = []
    clearInterval(this.timerSubscription)
  }

  async connect (device) {
    this.device = device
    this.device = await device.connect({ autoConnect: true })
    this.stopScan()
    return this.device

  }

  async start () {
    this.ninix = new Ninix(this.device)
    await this.ninix.discover()
    await this.ninix.bond()
    return this.ninix
  }

  async disconnect () {
    this.device = await this.manager.cancelDeviceConnection(this.device.id)
    this.ninix = null
  }

  onDisconnected (listener) {
    return this.device.onDisconnected((error, device) => {
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
