/**
 * predefined command code
 * code should not be greater than 128
 * @type {{flashSync: number, ramSync: number, updateFirmware: number, turnOff: number, reset: number, errorLog: number, eraseErrorLog: number}}
 */
const COMMANDS = {
  SYNC_FLASH:      0x01,
  SYNC_RAM:        0x02,
  RESET:           0x05,
  TURN_OFF:        0x06,
  LOG_ERRORS:      0x08,
  ERASE_ERROR_LOG: 0x09,
  UPDATE_FIRMWARE: 0x0a,
};

export default COMMANDS;
