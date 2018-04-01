import { BleManager } from 'react-native-ble-plx'
import UUID from './UUID'
import moment from 'moment'
import Ninix from './Ninix'
import _ from 'lodash'
import { NordicDFU, DFUEmitter } from "react-native-nordic-dfu"

class CentralManager {

  device = null
  scannedDevices = {}
  readyForUpdate = false
  dfuStart = false

  constructor () {
    this.manager = new BleManager()
    this.period = 15
  }

  timer () {
     return setInterval(
      () => {
        Object.keys(this.scannedDevices).forEach((item) => {
          console.tron.log({log: 'timer', diff: moment().diff(this.scannedDevices[item].time, 's')})
          if (moment().diff(this.scannedDevices[item].time, 's') > this.period) {
            this.scannedDevices = _.omit(this.scannedDevices, item)
            // TODO: we should notify user if a device lost
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
    this.scannedDevices = {}
    clearInterval(this.timerSubscription)
  }

  async connect (device) {
    this.device = await device.connect({ autoConnect: true })
    this.stopScan()
    return this.device
  }

  async start () {
    this.ninix = new Ninix(this.device)
    await this.ninix.discover()
    await this.ninix.bond()
    await this.ninix.getTimestamp()
    return this.ninix
  }

  async disconnect () {
    this.device = await this.manager.cancelDeviceConnection(this.device.id)
    this.ninix = null
  }

  onDisconnected (listener) {
    return this.device.onDisconnected((error, device) => {
      if (this.readyForUpdate) {
        this.updateFirmware()
      }
      listener(error, device)
    })
  }

  addStateListener (listener, emitCurrentState = true) {
    return this.manager.onStateChange(listener, emitCurrentState)
  }

  startUpdate (path) {
    this.readyForUpdate = true
    this.path = path

    console.tron.log({log: 'set ready for update', readyForUpdate: this.readyForUpdate})
    this.ninix.sendUpdateFirmwareCommand().then(
      (char) => console.tron.log({log: 'command send', char})
    )
  }

  updateFirmware () {
    console.tron.log({log: 'start update firmware', device: this.device})

    DFUEmitter.addListener("DFUProgress", ({ percent }) => {
      console.tron.log({log: "DFU progress:", percent})
    })
    DFUEmitter.addListener("DFUStateChanged", ({ state }) => {
      console.tron.log({log: "DFU state:", state})
    })

    console.tron.log({log: 'scan for new devices'})

    this.manager.startDeviceScan(
      null,
      { allowDuplicates: true },
      (error, device) => {
        console.tron.log({log: 'device found', device})
        if (device.id === 'D8:9E:69:13:2A:04' && !this.dfuStart) {
          this.dfuStart = true
          console.tron.log({log: 'finally we find true device', device})

          this.manager.stopDeviceScan()
          console.tron.log({log: 'scan stopped', device})
          NordicDFU.startDFU({
            deviceAddress: 'D8:9E:69:13:2A:04',
            filePath: this.path
          })
            .then(res => console.tron.log({log: "Transfer done:", res}))
            .catch(error => console.tron.log({log: 'transfer fail', error, message: error.message}))
            .finally(() => {
              this.readyForUpdate = false
            })
        }
      }
    )

  }

  cancelTransaction (id) {
    this.manager.cancelTransaction(id)
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
