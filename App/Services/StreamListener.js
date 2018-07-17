import { Subject } from 'rxjs';
import moment from 'moment';
import _ from 'lodash';
import VitalSign from '../Realm/VitalSign';
import Api from './Api';
import ModelToJson from '../Transform/ModelToJson';
import TempVitalSign from "../Realm/TempVitalSign";

class StreamListener {
  constructor() {
    this.missSynced = 0
    this.subjcet = new Subject();
    this.localData = [];
    this.temperatures = Array.apply(null, { length: 60 }).fill(null);
    this.respiratories = Array.apply(null, { length: 70 }).fill(null);
    this.timer = null;
    this.isSyncing = false;
    this.api = Api.create();
  }

  listen(ninix) {
    this.ninix = ninix;
    this.listener && this.listener.remove();
    this.listener = ninix.stream(this.dataListener.bind(this));
  }

  dataListener(data) {
    this.setTimer();
    const record = { ...data, registerAt: this.timer };
    this.store(record);
    this.broadcast(record);
    // this.syncWithLocalDeviceData(this.ninix, data);
    this.syncToServer(data);
  }

  store(record) {
    this.saveTemporary(record);
    this.save(record);
  }

  broadcast(record) {
    this.subjcet.next(record);
  }

  syncWithLocalDeviceData(ninix, data) {
    if (!this.isSyncing && (data.flashStore || data.ramStore)) {
      console.tron.log({ log: 'syncWithLocalDeviceData start' });
      this.isSyncing = true;
      if (data.flashStore) {
        console.tron.log({ log: 'data.flashStore' });
        ninix
          .flashSyncCommand()
          .then(this.startSyncWithNinix.bind(this))
          .catch(error => (this.isSyncing = false));
      } else if (data.ramStore) {
        console.tron.log({ log: 'data.ramStore' });
        ninix
          .ramSyncCommand()
          .then(this.startSyncWithNinix.bind(this))
          .catch(error => (this.isSyncing = false));
      }
    }
  }

  startSyncWithNinix() {
    this.syncListener = this.ninix.sync((data, error) => {
      if (error) {
        console.tron.log({ error });
        return;
      }
      console.tron.log({ log: 'startSyncWithNinix', data });
      this.isSyncing = false;
      this.syncListener.remove();
      const result = this.convertSyncToNormalData(data);
      console.tron.log({ log: 'startSyncWithNinix', result });
      this.saveArray(result);
      this.localData = [...this.localData, ...result];
    });
  }

  setTimer() {
    if (this.timer) {
      this.timer += 1;
    } else {
      this.timer = moment().unix();
    }
  }

  save(data) {
    VitalSign.store(data);
  }

  saveArray(dataArray) {
    VitalSign.storeArray(dataArray);
  }

  saveTemporary(record) {
    this.saveLocalRecord(record);
    this.expectedTime = moment(record.registerAt).unix() + 1;
  }

  saveLocalRecord(record) {
    if (this.expectedTime) {
      const currentTime = moment(record.registerAt).unix();
      for (let i = 0; i < Math.min(59, currentTime - this.expectedTime); i++) {
        this.temperatures = [...this.temperatures, null];
        this.respiratories = [...this.respiratories, null];
      }
      this.temperatures = _.takeRight(
        [...this.temperatures, record.temperature],
        60
      );
      this.respiratories = _.takeRight(
        [
          ...this.respiratories,
          record.respiratory < 253 ? record.respiratory : null,
        ],
        70
      );
    }
  }

  getTemperatures() {
    return this.temperatures.every(item => item === null)
      ? null
      : this.temperatures;
  }

  getRespiratories() {
    let respiratories = [];
    console.tron.log({ res: this.respiratories });
    for (let i = 10; i < 70; i++) {
      const slice = this.respiratories.slice(i - 10, i);
      if (slice.every(item => item === null)) {
        respiratories = [...respiratories, null];
      } else {
        respiratories = [
          ...respiratories,
          slice.reduce((acc, curr) => (curr ? acc + curr : acc), 0) /
            slice.filter(item => item !== null).length,
        ];
      }
    }
    return respiratories.every(item => item === null) ? null : respiratories;
  }

  subscribe(...args) {
    return this.subjcet.subscribe(...args);
  }

  convertSyncToNormalData(data) {
    let result = [];
    for (let i = 0; i < data.length - 1; i++) {
      const left = data[i];
      const right = data[i + 1];
      const period = right.registerAt - left.registerAt;
      for (let j = 0; j < period; j++) {
        result = [
          ...result,
          _.mapValues(
            left,
            (value, key) => left[key] + (j * (right[key] - left[key])) / period
          ),
        ];
      }
    }
    return result;
  }

  syncToServer(data) {
    if (this.timer % 60 === 0) {
      TempVitalSign.read().then(items => {
        const records = [data, ..._.values(items)]
        this.sendRecordsToServer(records)
      })
        .catch(error => {
          console.tron.log({error})
        })
    }

    this.sendRecordsToServer([data])
  }

  sendRecordsToServer(records) {
    this.api
      .sendData({data: records.map(ModelToJson.vitalSign)})
      .then(resp => {
        console.tron.log({sync: true})
      })
      .catch(error => {
        TempVitalSign.store(records[0])
      })
  }
}

export default (streamListener = new StreamListener());
