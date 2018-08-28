import PacketConfig from './PacketConfig';
import Manipulator from './Utilities/Manipulator';
import {toInt32} from './Utilities/Helper';

/**
 * convert raw bytes of stream to usable data
 * 20 bytes receive:
 * 0 - temperature
 * 1 - humidity (bit 2, 3) + orientation (bit 0, 1)
 * 2 - lowByte battery
 * 3 - highByte battery
 * 4 - respiratory
 * 5, 6, 7 - unused
 * 8 - is flash empty
 * 9 - is ram empty
 * 10 - is battery full charge
 * 11 - is battery charging
 * 12 - is battery low
 * 13 - unused
 * 14 - lowByte Respiratory magnitude
 * 15 - highByte Respiratory magnitude
 * 16, 17, 18, 19 - unused
 * @param data
 * @returns {{temperature: Number, humidity: Number, orientation: Number, battery: Number, respiratory: Number, flashStore: Boolean, ramStore: Boolean, fullCharged: Boolean, charging: Boolean, lowBattery: Boolean, respMagnitude: Number}}
 */
function stream(data) {

  return {
    temperature:   Manipulator.temperature(data[0]),
    humidity:      Manipulator.humidity(data[1]),
    orientation:   Manipulator.orientation(data[1]),
    battery:       Manipulator.battery(data[2], data[3], data[11]),
    respiratory:   Manipulator.respiratory(data[4]),
    flashStore:    Manipulator.flashLoad(data[8]),
    ramStore:      Manipulator.ramLoad(data[9]),
    fullCharged:   Manipulator.isBatteryFullCharge(data[10]),
    charging:      Manipulator.isBatteryCharging(data[11]),
    lowBattery:    Manipulator.isBatteryLowPower(data[12]),
    respMagnitude: Manipulator.respiratoryMagnitude(data[14], data[15]),
  };
}

/**
 * convert raw data to sync array packet
 * @param data
 * @param timeOffset - the amount of time in second that device different with actual time
 * @returns {*[]}
 */
function sync(data, timeOffset) {

  let result = [];
  const unix = toInt32(data.slice(16, 20)) + timeOffset;

  for (let i = 0; i < PacketConfig.sync.bundleSize; i++) {
    result.push({
      respiratory: Manipulator.respiratory(data[i]),
      temperature: Manipulator.temperature(data[i + 4]),
      humidity:    Manipulator.humidity(data[i + 8]),
      orientation: Manipulator.orientation(data[i + 8]),
      registerAt:  unix - (PacketConfig.sync.bundleSize - i) * PacketConfig.sync.bundleInterval,
    });
  }

  // we used reverse to sort array in ascending order of registerAt
  return result.reverse();
}

/**
 * convert raw data to alarm packet
 * @param data
 * @returns {{respiratory: boolean, orientation: boolean, temperature: boolean}}
 */
function alarm(data) {
  return {
    respiratory: !!data[0],
    orientation: !!data[1],
    temperature: !!data[2],
  };
}

export default {
  stream,
  sync,
  alarm,
};
