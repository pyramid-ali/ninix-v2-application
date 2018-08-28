import { BleManager, Device } from 'react-native-ble-plx';
import {SERVICES} from './UUID';
import moment from 'moment';
import Ninix from './Ninix';
import _ from 'lodash';

// TODO: we don't need tries here
/**
 * CentralManager
 */
class CentralManager {

  /**
   * initialize BleManager, and necessary properties
   */
  constructor() {
    this._manager = new BleManager();
    this._scannedDevices = {}
    // this.manager.setLogLevel(LogLevel.Verbose)

    this._init();
  }

  /**
   * initialize default values
   */
  _init() {
    this.connectOptions = {
      autoConnect: false,
      timeout: 30 * 1000,
    };

    this._scanOptions = {
      allowDuplicates: true
    };

    this._tries = 0;
    this._scannedDevices = {};
    this._scannedDeviceTimeout = 5;
  }

  /**
   * set state listener
   * @param listener
   * @param emitCurrentState
   * @returns {*}
   */
  addStateListener(listener, emitCurrentState = true) {
    return this._manager.onStateChange(listener, emitCurrentState);
  }

  // TODO: we should change the behavior of listener get scanned devices, we need to pass error to listener if there is a error
  /**
   * scan ninix devices with 2 condition,
   * first: having specific service UUID
   * second: device name must include ninix (uppercase or lowercase doesn't matter)
   * @param listener
   */
  scanForDevices(listener) {
    console.tron.log({log: 'scanForDevices'})
    // run timer for removing out of range devices
    this._timerSubscription = this._timer(listener);
    this._manager.startDeviceScan(
      [SERVICES.MAIN],
      this._scanOptions,
      (error, device) => {
        if (error) {
          console.tron.log({device, error})
          return;
        }

        this._notifyScanListener(listener, device);
      }
    );
  }

  /**
   * stop scan
   * cleaning scan devices property, and clear timer subscription
   */
  stopScan() {
    this._manager.stopDeviceScan();
    this._scannedDevices = {};
    clearInterval(this._timerSubscription);
  }

  /**
   * cancel transaction
   * @param id transaction id
   */
  cancelTransaction(id) {
    this._manager.cancelTransaction(id);
  }

  /**
   * connect to specific device
   * we set connecting device here if we want to cancel device connection
   * @param device
   * @returns {Promise<Device>}
   */
  async connect(device) {
    this._startConnect(device);

    const connectedDevice = await this._manager.connectToDevice(device.id, this.connectOptions);

    this._didConnect(connectedDevice)

    return connectedDevice;
  }

  /**
   * reconnect to last disconnected device
   * @return {Promise<Device>}
   */
  async reconnect () {
    if (this.disconnectedDevice) {
      return this.connect(this.disconnectedDevice);
    }
  }

  /**
   * cancel connection
   * use for canceling connecting device, for disconnect from connected device use disconnect method
   * @returns {Promise<*>}
   */
  async cancelConnection() {

    if (this.connectingDevice) {
      return await this._manager.cancelDeviceConnection(
        this.connectingDevice.id
      );
    }

  }

  /**
   * setup ninix device
   * @returns {Promise<Ninix|null>}
   */
  async setup(options) {
    this.ninix = await Ninix.init(options)
    return this.ninix;
  }

  /**
   * disconnect from device
   * @returns {Promise<void>}
   */
  async disconnect() {

    if (this.connectedDevice) {
      const isConnected = await this.connectedDevice.isConnected();

      if (isConnected) {
        return await this.connectedDevice.cancelConnection()
      }

    }

  }

  /**
   * start timer for checking out of range devices after _scannedDeviceTimeout interval
   * @param listener
   * @returns {Object}
   */
  _timer(listener) {

    return setInterval(() => {
      Object.keys(this._scannedDevices).forEach(item => {

        if (moment().diff(this._scannedDevices[item].time, 's') > this._scannedDeviceTimeout) {
          this._scannedDevices = _.omit(this._scannedDevices, item);
          listener(this._scannedDevices);
        }

      });
    }, this._scannedDeviceTimeout * 1000);

  }

  /**
   * notify scan listener when there is a new scanned device
   * @param listener
   * @param device
   */
  _notifyScanListener(listener, device) {
    if (!device.name.toLowerCase().includes('ninix')) {
      return;
    }
    // updating discover time, and prevent duplicate device
    const oldScannedDevices = this._scannedDevices;
    this._scannedDevices = {
      ...oldScannedDevices,
      [device.id]: { device, time: moment() },
    };

    if (
      !_.isEqual(
        Object.keys(oldScannedDevices),
        Object.keys(this._scannedDevices)
      )
    ) {
      listener(this._scannedDevices);
    }
  }

  /**
   * begin to connecting to device
   * @param device device object that getting from scan device
   */
  _startConnect(device) {
    this._tries += 1;
    this.disconnectedDevice = null;
    this.connectingDevice = device;
  }

  /**
   * did connect to device successfully
   * @param device
   */
  _didConnect(device) {
    this.connectingDevice = null;
    this.connectedDevice = device;
    this._setDisconnectListener(device);
  }

  /**
   * call when device disconnected successfully
   * @param error
   * @param device
   * @private
   */
  _didDisconnect(error, device) {
    this._error = error;
    this.connectedDevice = null;
    this.disconnectedDevice = device;
    this.ninix = null;
  }

  /**
   * set disconnect listener for device
   * @private
   */
  _setDisconnectListener (device) {
    device.onDisconnected(this._didDisconnect.bind(this));
  }

  /**
   * start dfu
   * @returns {Promise<*>}
   */
  async startUpdate() {
    return await this.ninix.updateFirmware();
  }

}

export default (centralManager = new CentralManager());
