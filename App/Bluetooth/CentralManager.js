import { BleManager, LogLevel, Device } from 'react-native-ble-plx';
import UUID from './UUID';
import moment from 'moment';
import Ninix from './Ninix';
import _ from 'lodash';
import { NordicDFU } from 'react-native-nordic-dfu';

class CentralManager {
  // TODO: we should define a method for getting and setting tries out of class
  device = null;
  forceDisconnect = false;
  tries = 0;
  scannedDevices = {};

  /***
   * initialize BleManager
   * period time for scanned device: 5 seconds
   * connection timeout: 30 seconds
   */
  constructor() {
    this.manager = new BleManager();
    // this.manager.setLogLevel(LogLevel.Verbose)
    this.period = 5;
    this.connectionTimeout = 30;
    this.scanOptions = { allowDuplicates: true };
  }

  /***
   * start timer for checking out of range devices after period interval
   * @param listener
   * @returns {Object}
   */
  timer(listener) {
    return setInterval(() => {
      Object.keys(this.scannedDevices).forEach(item => {
        if (moment().diff(this.scannedDevices[item].time, 's') > this.period) {
          this.scannedDevices = _.omit(this.scannedDevices, item);
          listener(this.scannedDevices);
        }
      });
    }, this.period * 1000);
  }

  /***
   * scan ninix devices with 2 condition,
   * first: having specific service UUID
   * second: device name must include ninix (uppercase or lowercase doesn't matter)
   * @param listener
   */
  scanForDevices(listener) {
    // run timer for removing out of range devices
    this.timerSubscription = this.timer(listener);
    this.manager.startDeviceScan(
      [UUID.services.main.uuid],
      this.scanOptions,
      (error, device) => {
        // check device name

        if (error) {
          console.tron.log({device, error})
          return;
        }

        if (!device.name.toLowerCase().includes('ninix')) {
          return;
        }
        // updating discover time, and prevent duplicate device
        const oldScannedDevices = this.scannedDevices;
        this.scannedDevices = {
          ...oldScannedDevices,
          [device.id]: { device, time: moment() },
        };
        // only if a new device scanned notify listener
        if (
          !_.isEqual(
            Object.keys(oldScannedDevices),
            Object.keys(this.scannedDevices)
          )
        ) {
          listener(this.scannedDevices);
        }
      }
    );
  }

  /***
   * stop scan
   * cleaning scan devices property, and clear timer subscription
   */
  stopScan() {
    this.manager.stopDeviceScan();
    this.scannedDevices = {};
    clearInterval(this.timerSubscription);
  }

  /***
   * connect to specific device
   * we set connecting device here if we want to cancel device connection
   * @param device
   * @returns {Promise<Device>}
   */
  async connect(device) {
    // TODO: why we should stop scan here? this.connectingDevice should be null after device connected
    this.tries += 1;
    this.connectingDevice = device;
    this.device = await this.manager.connectToDevice(device.id, {
      autoConnect: false,
      timeout: this.connectionTimeout * 1000,
    });
    this.connectingDevice = null;
    return this.device;
  }

  /***
   * cancel connection
   * use for canceling connecting device, for disconnect from connected device use disconnect function
   * @returns {Promise<*>}
   */
  async cancelConnection() {
    if (this.connectingDevice) {
      return await this.manager.cancelDeviceConnection(
        this.connectingDevice.id
      );
    }
    return null;
  }

  async setup() {
    this.ninix = new Ninix(this.device);
    await this.ninix.discover();
    await this.ninix.bond();
    await this.ninix.getTimestamp();
    return this.ninix;
  }

  async disconnect() {
    this.forceDisconnect = true;
    if (this.device) {
      const isConnected = await this.device.isConnected();
      if (isConnected) {
        this.device = await this.device.cancelConnection();
      }
    }
    this.ninix = null;
  }

  onDisconnected(listener) {
    return this.device.onDisconnected((error, device) => {
      listener(error, device);
    });
  }

  addStateListener(listener, emitCurrentState = true) {
    return this.manager.onStateChange(listener, emitCurrentState);
  }

  async startUpdate() {
    console.tron.log({
      log: 'set ready for update',
      readyForUpdate: this.readyForUpdate,
    });
    return await this.ninix.sendUpdateFirmwareCommand();
  }

  async updateFirmware(path) {
    const id = this.getFirmwareUpdateDeviceId(this.device.id);
    return await NordicDFU.startDFU({
      deviceAddress: id,
      filePath: path,
    });
  }

  cancelTransaction(id) {
    this.manager.cancelTransaction(id);
  }

  getFirmwareUpdateDeviceId(oldId) {
    let lastPartId = (parseInt(oldId.split(':').slice(-1), 16) + 1)
      .toString(16)
      .toUpperCase();
    lastPartId = lastPartId.length === 1 ? '0' + lastPartId : lastPartId;
    return _.concat(oldId.split(':').slice(0, 5), lastPartId).join(':');
  }
}

export default (centralManager = new CentralManager());
