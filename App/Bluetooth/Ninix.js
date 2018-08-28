import moment from 'moment';
import _ from 'lodash';

import CentralManager from './CentralManager';
import PacketManager from './PacketManager';
import COMMANDS from './Commands';
import {SERVICES, CHARACTERISTICS} from "./UUID";
import {
  encodeHexToBase64,
  decodeBase64ToHexString,
  encodeUnixTimeToBase64WithLeadingZero,
  decodeBase64ToInt32,
  decodeBase64,
  decodeBase64ToBytes, sequentialArray
} from "./Utilities/Helper";

// TODO: split codes to each own class
export default class Ninix {

  /**
   * initialize Ninix Class
   * @param options
   * @return {Promise<void>}
   */
  static async init(options) {
    const instance = new Ninix(options.device);
    await instance.setup();
    return instance;
  }

  /**
   * constructor
   * @param device
   */
  constructor(device) {
    this.device = device;
    this.syncPacketData = [];
    this.syncTimeout = 30;
  }

  /**
   * setup ninix to work with device
   * @return {Promise<void>}
   */
  async setup() {
    this.device = await this.discover();
    await this.bond();
    this.syncOffsetTime = this.getSyncTimeOffset();
  }

  /**
   * discover service and characteristics
   * @return {Promise<*>}
   */
  async discover() {
    return await this.device.discoverAllServicesAndCharacteristics();
  }

  /**
   * pair device with phone
   * @return {Promise<NativeCharacteristic>}
   */
  async bond() {
    return await this.device
      .readCharacteristicForService(SERVICES.MAIN, CHARACTERISTICS.COMMAND)
  }

  /**
   * there is an offset time for sync packet times that we should know, we can get this time offset with below method
   * @return {Promise<number>}
   */
  async getSyncTimeOffset() {
    const response = await this.sendTimestamp();
    return decodeBase64ToInt32(response.value);
  }

  /* ----------------------------------- getting information ------------------------------------- */

  /**
   * get device name
   * @return {Promise<string>}
   */
  async getName() {
    return await this.device
      .readCharacteristicForService(SERVICES.DEVICE_INFORMATION, CHARACTERISTICS.NAME)
      .then(char => char.value)
      .then(decodeBase64);
  }

  /**
   * get device serial number
   * @return {Promise<string>}
   */
  async getSerial() {
    return await this.device
      .readCharacteristicForService(SERVICES.DEVICE_INFORMATION, CHARACTERISTICS.SERIAL)
      .then(char => char.value)
      .then(decodeBase64)
      .then(value => value || 'unknown');
  }

  /**
   * get device hardware revision
   * @return {Promise<string>}
   */
  async getHardwareRevision() {
    return await this.device
      .readCharacteristicForService(SERVICES.DEVICE_INFORMATION, CHARACTERISTICS.REVISION)
      .then(char => char.value)
      .then(decodeBase64);
  }

  /**
   * get device firmware version
   * @return {Promise<string>}
   */
  async getFirmware() {
    return await this.device
      .readCharacteristicForService(SERVICES.DEVICE_INFORMATION, CHARACTERISTICS.FIRMWARE)
      .then(char => char.value)
      .then(decodeBase64);
  }

  /**
   * get full information of device,
   * include: name, serial, hardware revision, firmware
   * @return {Promise<{name: string, serial: string, revision: string, firmware: string}>}
   */
  async getInformation() {

    return {
      name: await this.getName(),
      serial: await this.getSerial(),
      revision: await this.getHardwareRevision(),
      firmware: await this.getFirmware(),
    };

  }

  /**
   * get error log of device
   * @return {Promise<string>}
   */
  async getErrorLog() {
    await this.sendCommand(COMMANDS.LOG_ERRORS);
    return this.device
      .readCharacteristicForService(SERVICES.MAIN, CHARACTERISTICS.COMMAND)
      .then(char => char.value)
      .then(decodeBase64ToHexString);
  }

  /* ----------------------------------- end of getting information ------------------------------ */

  /**
   * send command
   * command should be in hex format
   * @param command
   * @return {Promise<*>}
   */
  async sendCommand(command) {
    return await this.device.writeCharacteristicWithResponseForService(SERVICES.MAIN, CHARACTERISTICS.COMMAND, encodeHexToBase64(command))
  }

  /**
   * send timestamp to device
   * @return {Promise<*>}
   */
  async sendTimestamp() {
    const data = encodeUnixTimeToBase64WithLeadingZero(moment().unix());
    return await this.device.writeCharacteristicWithResponseForService(SERVICES.MAIN, CHARACTERISTICS.COMMAND, data)
  }

  /**
   * sync flash
   * @return {Promise<*>}
   */
  async syncFlash() {
    return await this.sendCommand(COMMANDS.SYNC_FLASH);
  }

  /**
   * sync ram
   * @return {Promise<*>}
   */
  async syncRam() {
    return await this.sendCommand(COMMANDS.SYNC_RAM);
  }

  /**
   * turn off device
   * @return {Promise<*>}
   */
  async turnOff() {
    return await this.sendCommand(COMMANDS.TURN_OFF);
  }

  /**
   * update device firmware
   * @return {Promise<*>}
   */
  async updateFirmware() {
    return await this.sendCommand(COMMANDS.UPDATE_FIRMWARE);
  }

  /**
   * reset device
   * @return {Promise<*>}
   */
  async reset() {
    return await this.sendCommand(COMMANDS.RESET);
  }

  /* -------------------------------------- */

  // TODO: we should use RXJS here
  stream(listener) {
    return this.device
      .monitorCharacteristicForService(SERVICES.MAIN, CHARACTERISTICS.STREAM, (error, char) => {
      if (char) {
        listener(PacketManager.stream(decodeBase64ToBytes(char.value)));
      }
    });
  }

  sync(listener) {
    // TODO: maybe we can split received data into 5 section for simulating one data per second
    const endCharacteristicValue = sequentialArray(20)

    this._startSyncTimer(listener);
    this.lastSyncPacketTime = moment();

    return this.device
      .monitorCharacteristicForService(SERVICES.MAIN, CHARACTERISTICS.SYNCHRONIZE, (error, char) => {
      this.lastSyncPacketTime = moment();

      if (char) {
        const bytes = decodeBase64ToBytes(char.value);

        if (_.isEqual(bytes, endCharacteristicValue)) {
          this._didSyncFinish(listener);
          return;
        }

        const result = PacketManager.sync(bytes, this.syncOffsetTime);
        this.syncPacketData = _.concat(this.syncPacketData, result);
      }
    }, 'sync');
  }

  /**
   * alarm listener
   * @param listener
   * @return {Promise<void>}
   */
  alarmListener(listener) {
    return this.device
      .monitorCharacteristicForService(SERVICES.MAIN, CHARACTERISTICS.ALARM, (error, char) => {
      if (char) {
        listener(PacketManager.alarm(decodeBase64ToBytes(char.value)));
      }
    });
  }

  /**
   * if sync finished
   * @param listener
   * @private
   */
  _didSyncFinish(listener) {
    listener(this.syncData);
    CentralManager.cancelTransaction('sync');
    this.syncPacketData = [];
    clearInterval(this.syncTimer);
  }

  /**
   * did sync failed
   * @param listener
   * @private
   */
  _didSyncFail(listener) {
    this.syncData = [];
    listener(null, 'timeout error');
    CentralManager.cancelTransaction('sync');
    clearInterval(this.syncTimer);
  }

  /**
   * start a timer for sync timeout
   * @param listener
   * @private
   */
  _startSyncTimer(listener) {
    this.syncTimer = setInterval(() => {
      if (moment().diff(this.lastSyncPacketTime, 's') > this.syncTimeout) {
        this._didSyncFail(listener);
      }
    }, 1000);
  }

}
