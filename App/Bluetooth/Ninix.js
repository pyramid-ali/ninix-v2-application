import UUID from './UUID';
import DataHandler from './DataHandler';
import { Base64 } from 'js-base64';
import Commands from './Commands';
import CentralManager from './CentralManager';
import moment from 'moment';
import _ from 'lodash';

// TODO: split codes to each own class
export default class Ninix {
  constructor(device) {
    // TODO: we can save device in async storage for later uses, but should we do this in ble package?
    this.device = device;
    this.syncData = [];
    this.syncTimeout = 30;
  }

  async discover() {
    this.device = await this.device.discoverAllServicesAndCharacteristics();
    this.services = await this.getServices();
    await this.getCharacteristics();
  }

  async getTimestamp() {
    const result = await this.sendTimestamp();
    this.differenceTime = this.getDifferenceTimestamp(result);
  }

  async disconnect() {
    return await this.device.cancelConnection();
  }

  async getServices() {
    const services = await this.device.services();
    return services.reduce((services, service) => {
      return { ...services, [service.id]: { service } };
    });
  }

  async getCharacteristics() {
    await asyncForEach(Object.keys(this.services), async id => {
      const service = this.services[id].service;
      if (service) {
        const characteristics = await service.characteristics();
        this.services[id].characteristics = characteristics;
        this.assignCharacteristics(characteristics);
      }
    });
  }

  assignCharacteristics(characteristics) {
    characteristics.forEach(characteristic => {
      switch (characteristic.uuid) {
        case UUID.services.main.chars.stream:
          this.streamCharacteristic = characteristic;
          break;
        case UUID.services.main.chars.command:
          this.commandCharacteristic = characteristic;
          break;
        case UUID.services.main.chars.synchronize:
          this.syncCharacteristic = characteristic;
          break;
        case UUID.services.main.chars.alarm:
          this.alarmCharacteristic = characteristic;
          break;
        case UUID.services.deviceInformation.chars.name:
          this.deviceNameCharacteristic = characteristic;
          break;
        case UUID.services.deviceInformation.chars.serial:
          this.deviceSerialCharacteristic = characteristic;
          break;
        case UUID.services.deviceInformation.chars.revision:
          this.deviceHardwareRevisionCharacteristic = characteristic;
          break;
        case UUID.services.deviceInformation.chars.firmware:
          this.deviceFirmawareCharacteristic = characteristic;
          break;
      }
    });
  }

  async bond() {
    try {
      return await this.commandCharacteristic.read();
    } catch (error) {
      return null;
    }
  }

  /* ----------------------------------- getting information ------------------------------------- */
  async getName() {
    return await this.deviceNameCharacteristic.read().then(parseCharValue);
  }

  async getSerial() {
    return await this.deviceSerialCharacteristic.read().then(parseCharValue);
  }

  async getHardwareRevision() {
    return await this.deviceHardwareRevisionCharacteristic
      .read()
      .then(parseCharValue);
  }

  async getFirmware() {
    return await this.deviceFirmawareCharacteristic.read().then(parseCharValue);
  }

  async getInformation() {
    const name = await this.getName();
    const serial = await this.getSerial();
    const revision = await this.getHardwareRevision();
    const firmware = await this.getFirmware();

    return {
      name,
      serial,
      revision,
      firmware,
    };
  }

  async getErrorLog() {
    await this.sendCommand(Commands.errorLog);
    return this.commandCharacteristic
      .read()
      .then(this.getCharacteristicBytesString);
  }

  /* ----------------------------------- end of getting information ------------------------------ */

  stream(listener) {
    return this.streamCharacteristic.monitor((error, char) => {
      if (char) {
        const bytes = this.getCharacteristicBytes(char);
        const result = DataHandler.stream(bytes);
        listener(result);
      }
    });
  }

  sync(listener) {
    // TODO: maybe we can split received data into 5 section for simulating one data per second
    console.tron.log({ log: 'ninix sync 1' });
    const endChar = Array.apply(null, { length: 20 }).map(
      Function.call,
      Number
    );
    console.tron.log({
      log: 'ninix sync 2',
      endChar,
      sync: this.syncCharacteristic,
    });
    this.startSyncTimer(listener);
    this.lastSyncPacketTime = moment();
    console.tron.log({ log: 'before monitor' });
    return this.syncCharacteristic.monitor((error, char) => {
      console.tron.log({ log: 'ninix sync 3', error, char });
      this.lastSyncPacketTime = moment();
      if (char) {
        const bytes = this.getCharacteristicBytes(char);
        console.tron.log({ log: 'ninix sync 4', bytes });
        if (_.isEqual(bytes, endChar)) {
          this.didSyncFinish(listener);
          return;
        }

        const result = DataHandler.sync(bytes, this.differenceTime);
        console.tron.log({ log: 'ninix sync 5', result });
        this.syncData = [...this.syncData, ...result];
      }
    }, 'sync');
  }

  alarmListener(listener) {
    return this.alarmCharacteristic.monitor((error, char) => {
      if (char) {
        const bytes = this.getCharacteristicBytes(char);
        const result = DataHandler.alarm(bytes);
        listener(result);
      }
    });
  }

  didSyncFinish(listener) {
    listener(this.syncData);
    CentralManager.cancelTransaction('sync');
    this.syncData = [];
    clearInterval(this.syncTimer);
  }

  didSyncFail(listener) {
    this.syncData = [];
    listener(null, 'timeout error');
    CentralManager.cancelTransaction('sync');
    clearInterval(this.syncTimer);
  }

  startSyncTimer(listener) {
    this.syncTimer = setInterval(() => {
      if (moment().diff(this.lastSyncPacketTime, 's') > this.syncTimeout) {
        this.didSyncFail(listener);
      }
    }, 1000);
  }

  getCharacteristicBytesString(char) {
    let arr = [];
    const buf = Buffer.from(char.value, 'base64');
    return buf.toString('hex');
  }

  getCharacteristicBytes(char) {
    let arr = [];
    const buf = Buffer.from(char.value, 'base64');
    for (let i = 0; i < buf.length; i++) {
      arr.push(buf[i]);
    }
    return arr;
  }

  async flashSyncCommand() {
    return await this.sendCommand(Commands.flashSync);
  }

  async ramSyncCommand() {
    return await this.sendCommand(Commands.ramSync);
  }

  async sendTurnOffDevice() {
    CentralManager.forceDisconnect = true;
    return await this.sendCommand(Commands.turnOff);
  }

  async sendUpdateFirmwareCommand() {
    return await this.sendCommand(Commands.updateFirmware);
  }

  async sendResetCommand() {
    return await this.sendCommand(Commands.reset);
  }

  async sendCommand(command) {
    const value = String.fromCharCode(command);
    const data = Base64.encode(value);
    return await this.commandCharacteristic.writeWithResponse(data);
  }

  async sendTimestamp() {
    const timestamp = moment().unix();
    const buffer = Buffer.alloc(5, 0);
    buffer.writeUInt32LE(timestamp, 1);
    const data = buffer.toString('Base64');

    return await this.commandCharacteristic.writeWithResponse(data);
  }

  getDifferenceTimestamp(characteristic) {
    let arr = this.getCharacteristicBytes(characteristic).reverse();
    let value = 0;
    for (let i = 0; i < 4; i++) {
      const shift = (3 - i) * 8;
      value += arr[i] << shift;
    }

    return value;
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function parseCharValue(char) {
  return Base64.decode(char.value);
}

// TODO: we can create a class for working with bytes, like convert base64 string to bytes or inverse
