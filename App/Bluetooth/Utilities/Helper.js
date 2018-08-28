
/**
 * get last part of device id
 * @param id
 * @returns {number}
 */
export const getLastIDPart = (id) => {
  return parseInt(id.split(':').slice(-1), 16)
}

/**
 * decimal to hex converter
 * @param number
 * @returns {string}
 */
export const DecimalToHexString = (number) => {
  const hexString = number.toString(16)
    .toUpperCase();

  return hexString.length % 2 ? '0' + hexString : hexString;
}

/**
 * convert byte array to number
 * @param byteArray
 * @return {number}
 */
export const toInt32 = (byteArray) => {
  return byteArray[3] |
    (byteArray[2] << 8) |
    (byteArray[1] << 16) |
    (byteArray[0] << 24);
}

/**
 * encode hex to base64
 * @param hex
 * @return {String}
 */
export const encodeHexToBase64 = (hex) => {
  return Buffer.from([hex]).toString('base64');
}

/**
 * decode base64 to hex string
 * @param base64
 * @return {String}
 */
export const decodeBase64ToHexString = (base64) => {
  const buf = Buffer.from(base64, 'base64');
  return buf.toString('hex');
}

/**
 * encode unix time to base 64 encoding
 * @param time
 * @return {String}
 */
export const encodeUnixTimeToBase64WithLeadingZero = (time) => {
  const buffer = Buffer.alloc(5, 0);
  buffer.writeUInt32LE(time, 1);
  return buffer.toString('base64');
}

/**
 * decode base63 to int32
 * @param base64
 * @return {Number}
 */
export const decodeBase64ToInt32 = (base64) => {
  return Buffer.from(base64, 'base64').readUInt32LE(0);
}

/**
 * decode base64 to string
 * @param base64
 * @return {String}
 */
export const decodeBase64 = (base64) => {
  return Buffer.from(base64, 'base64').toString();
}

/**
 * decode base64 to byte array
 * @param base64
 * @return {Array}
 */
export const decodeBase64ToBytes = (base64) => {
  let arr = [];
  const buf = Buffer.from(base64, 'base64');
  for (let i = 0; i < buf.length; i++) {
    arr.push(buf[i]);
  }
  return arr;
}

/**
 * sequential array, start from zero to length - 1
 * @param length
 * @return {number[]}
 */
export const sequentialArray = (length) => {
  return Array.apply(null, { length }).map(
    Function.call,
    Number
  );
}

export default {
  getLastIDPart,
  DecimalToHexString,
  encodeHexToBase64,
  decodeBase64ToHexString,
  encodeUnixTimeToBase64WithLeadingZero,
  decodeBase64ToInt32,
  decodeBase64,
  decodeBase64ToBytes
}
