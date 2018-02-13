import { BleManager } from 'react-native-ble-plx'
import UUID from './UUID'
import moment from 'moment'
import Ninix from './Ninix'

class CentralManager {

  scanning = false
  connected = false
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

  scanForDevices (listener = null) {

    this.timerSubscription = this.timer()
    this.manager.startDeviceScan([UUID.services.main.uuid], { allowDuplicates: true}, (error, device) => {
      this.scannedDevices = {...this.scannedDevices, [device.id]: {device, time: moment()}}
      listener(device)
    })
    this.scanning = true

  }

  stopScan () {
    console.tron.log({log: 'stop scan'})
    if (this.scanning) {
      this.manager.stopDeviceScan()
      this.scanning = false
      this.scannedDevices = []
      clearInterval(this.timerSubscription)
    }
  }

  async connect (device) {
    this.stopScan()
    const connected = await device.connect({ autoConnect: true })
    this.ninix = new Ninix(connected)
    return this.ninix
  }

  async disconnect () {
    const device = await this.ninix.disconnect()
    if (device) {
      this.connected = false
      return
    }
    throw new Error('cannot disconnect from device')
  }

  onDisconnected () {
    if (this.dcListener) {
      this.dcListener.remove()
    }
    this.dcListener = this.ninix.device.onDisconnected((error, device) => {
      this.connected = false
      this.dcListener.remove()
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
