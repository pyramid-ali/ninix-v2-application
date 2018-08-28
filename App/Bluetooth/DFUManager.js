import _ from "lodash";
import {NordicDFU} from "react-native-nordic-dfu";

import CentralManager from "./CentralManager";
import {getLastIDPart, DecimalToHexString} from "./Utilities/Helper";

/**
 * convert old device id to a new device
 * current algorithm just increment old device id
 * @param oldId
 * @returns {string}
 */
const getNewDeviceId = (oldId) => {
  let lastPartId = DecimalToHexString(getLastIDPart(oldId) + 1);
  return _.concat(oldId.split(':').slice(0, 5), lastPartId).join(':');
}

/**
 * start update dfu
 * @param device
 * @param path
 * @returns {Promise<void>}
 */
const udate = async (device, path) => {
  // TODO: send appropriate command to device before update

  const id = getNewDeviceId(CentralManager.disconnectedDevice.id);

  return await NordicDFU.startDFU({
    deviceAddress: id,
    filePath: path,
  });
}

export default {
  startUpdate
}
