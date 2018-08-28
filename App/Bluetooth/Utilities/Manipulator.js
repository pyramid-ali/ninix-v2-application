import _ from "lodash";

/**
 * convert temperature from packet byte to actual temperature
 * @param number
 * @return Number
 */
const temperature = (number) => {
  const result = number * 32 + 26612;
  return _.round(result * (175.72 / 65536) - 46.85, 1);
}

/**
 * convert respiratory
 * @param number
 * @return Number
 */
const respiratory = (number) => {
  return number;
}

/**
 * convert respiratory magnitude
 * @param lowByte
 * @param highByte
 * @return Number
 */
const respiratoryMagnitude = (lowByte, highByte) => {
  return highByte * 256 + lowByte;
}

/**
 * convert humidity
 * @param number
 * @return Number
 */
const humidity = (number) => {
  return _.round((number & 0x1c) >> 2);
}

/**
 * convert orientation
 * @param number
 * @return Number
 */
const orientation = (number) => {
  return _.round(number & 0x03);
}

/**
 * convert battery charge
 * @param lowByte
 * @param highByte
 * @param isCharging
 * @return Number
 */
const battery = (lowByte, highByte, isCharging) => {
  let voltage = 3.6 * ((highByte * 256 + lowByte) / 512);
  voltage = voltage > 4.2 ? 4.2 : voltage;
  const batteryCharge = isCharging
    ? batteryChargeWhileCharging(voltage)
    : batteryChargeWhileDischarging(voltage);
  return batteryCharge > 100 ? 100 : batteryCharge;
}

/**
 * is flash on load
 * @param number
 * @return {boolean}
 */
const flashLoad = (number) => {
  return number > 0;
}

/**
 * is ram on load
 * @param number
 * @return {boolean}
 */
const ramLoad = (number) => {
  return number > 0;
}

/**
 * is battery full charge
 * @param number
 * @return {boolean}
 */
const isBatteryFullCharge = (number) => {
  return number > 0;
}

/**
 * is battery charging
 * @param number
 * @return {boolean}
 */
const isBatteryCharging = (number) => {
  return number > 0;
}

/**
 * is battery low power
 * @param number
 * @return {boolean}
 */
const isBatteryLowPower = (number) => {
  return number > 0;
}

/**
 * get battery charge while battery is on charging
 * @param voltage
 */
const batteryChargeWhileCharging = (voltage) => {
  const a1 = 13.01;
  const b1 = 4.116;
  const c1 = 0.04047;
  const a2 = 27.46;
  const b2 = 4.05;
  const c2 = 0.04987;
  const a3 = 21.02;
  const b3 = 3.992;
  const c3 = 0.03878;
  const a4 = 30.56;
  const b4 = 3.931;
  const c4 = 0.05667;
  const a5 = 1.301e12;
  const b5 = 17.75;
  const c5 = 2.828;
  const a6 = 37.93;
  const b6 = 3.826;
  const c6 = 0.08209;

  let capacity =
    a1 * Math.exp(-Math.pow((voltage - b1) / c1, 2)) +
    a2 * Math.exp(-Math.pow((voltage - b2) / c2, 2)) +
    a3 * Math.exp(-Math.pow((voltage - b3) / c3, 2)) +
    a4 * Math.exp(-Math.pow((voltage - b4) / c4, 2)) +
    a5 * Math.exp(-Math.pow((voltage - b5) / c5, 2)) +
    a6 * Math.exp(-Math.pow((voltage - b6) / c6, 2));

  return _.round((capacity * 100) / 120);
}

/**
 * get battery charge while battery is on discharging
 * @param voltage
 */
const batteryChargeWhileDischarging = (voltage) => {
  const a1 = 173.3;
  const b1 = 4.398;
  const c1 = 0.3742;

  let capacity = a1 * Math.exp(-Math.pow((voltage - b1) / c1, 2));

  return _.round((capacity * 100) / 120);
}


export default {
  temperature,
  respiratory,
  respiratoryMagnitude,
  humidity,
  orientation,
  battery,
  flashLoad,
  ramLoad,
  isBatteryFullCharge,
  isBatteryCharging,
  isBatteryLowPower
}
