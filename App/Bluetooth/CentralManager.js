import { BleManager, LogLevel } from 'react-native-ble-plx'
import UUID from './UUID'
import moment from 'moment'
import Ninix from './Ninix'
import _ from 'lodash'
import { NordicDFU, DFUEmitter } from "react-native-nordic-dfu"

class CentralManager {

  device = null
  forceDisconnect = false
  tries = 0
  scannedDevices = {}
  readyForUpdate = false
  dfuStart = false

  constructor () {
    this.manager = new BleManager()
    this.manager.setLogLevel(LogLevel.Verbose)
    this.period = 5
    this.connectionTimeout = 30
  }

  /***
   * start timer for checking out of range devices after period interval
   * @param listener
   * @returns {Object}
   */
  timer (listener) {
     return setInterval(
      () => {
        Object.keys(this.scannedDevices).forEach((item) => {
          if (moment().diff(this.scannedDevices[item].time, 's') > this.period) {
            this.scannedDevices = _.omit(this.scannedDevices, item)
            listener(this.scannedDevices)
          }
        })
      }, this.period * 1000
    )
  }

  scanForDevices (listener) {

    this.timerSubscription = this.timer(listener)
    this.manager.startDeviceScan(
      [UUID.services.main.uuid],
      { allowDuplicates: true },
      (error, device) => {
        if (!device.name.toLowerCase().includes('ninix')) {
          return
        }
        const oldScannedDevices = this.scannedDevices
        this.scannedDevices = {
          ...oldScannedDevices,
          [device.id]: {device, time: moment()}
        }
        // only if a new device scanned notify listener
        if (!_.isEqual(Object.keys(oldScannedDevices), Object.keys(this.scannedDevices))) {
          listener(this.scannedDevices)
        }
      }
    )
  }

  stopScan () {
    this.manager.stopDeviceScan()
    this.scannedDevices = {}
    clearInterval(this.timerSubscription)
  }

  // TODO: decide between first stop scan then connect or reverse
  async connect (device) {
    this.tries += 1
    this.connectingDevice = device
    this.device = await device.connect({ autoConnect: false, timeout: this.connectionTimeout * 1000 })
    this.stopScan()
    return this.device
  }

  async cancelConnection () {
    if (this.connectingDevice) {
      return await this.manager.cancelDeviceConnection(this.connectingDevice.id)
    }
    return null
  }

  async start () {
    this.ninix = new Ninix(this.device)
    await this.ninix.discover()
    await this.ninix.bond()
    await this.ninix.getTimestamp()
    return this.ninix
  }

  async disconnect () {
    this.forceDisconnect = true
    if (this.device) {
      const isConnected = await this.device.isConnected()
      if (isConnected) {
        this.device = await this.device.cancelConnection()
      }
    }
    this.ninix = null
  }

  onDisconnected (listener) {
    return this.device.onDisconnected((error, device) => {

      if (this.readyForUpdate) {
        this.forceDisconnect = true
        this.updateFirmware()
      }

      listener(error, device)
    })
  }

  addStateListener (listener, emitCurrentState = true) {
    return this.manager.onStateChange(listener, emitCurrentState)
  }

  async startUpdate (path) {
    this.readyForUpdate = true
    this.path = path

    console.tron.log({log: 'set ready for update', readyForUpdate: this.readyForUpdate})
    return await this.ninix.sendUpdateFirmwareCommand()
  }

  updateFirmware () {
    console.tron.log({log: 'start update firmware', device: this.device})

    console.tron.log({log: 'scan for new devices'})
    const id = this.getFirmwareUpdateDeviceId(this.device.id)
    this.manager.startDeviceScan(
      null,
      { allowDuplicates: true },
      (error, device) => {
        console.tron.log({log: 'device found', device})
        if (device.id === id && !this.dfuStart) {
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

  getFirmwareUpdateDeviceId (oldId) {
    let lastPartId = (parseInt(oldId.split(':').slice(-1), 16) + 1).toString(16).toUpperCase()
    lastPartId = lastPartId.length === 1 ? '0' + lastPartId : lastPartId
    return _.concat(id.split(':').slice(0, 5), lastPartId).join(':')
  }

}

export default centralManager = new CentralManager()
