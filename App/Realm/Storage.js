import Realm from 'realm';
import { Alarm } from './Alarm';
import { VitalSign } from './VitalSign';
import { TempVitalSign } from './TempVitalSign';

export const write = (write, error = () => {}) => {
  Realm.open({ schema: [VitalSign, Alarm, TempVitalSign] })
    .then(realm => {
      realm.write(() => write(realm));
    })
    .catch(e => error(e));
};

export const read = (read, error = () => {}) => {
  Realm.open({ schema: [VitalSign, Alarm, TempVitalSign] })
    .then(read)
    .catch(e => error(e));
};

export default {
  write,
  read,
};
