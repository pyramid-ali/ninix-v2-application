export const services = {
  main: {
    uuid: "00001523-0000-1000-8000-00805f9b34fb",
    chars: {
      stream: "00001524-0000-1000-8000-00805f9b34fb",
      synchronize: "00001525-0000-1000-8000-00805f9b34fb",
      command: "00001526-0000-1000-8000-00805f9b34fb",
      alarm: "00001527-0000-1000-8000-00805f9b34fb",
    }
  },
  genericAccess: {
    uuid: "00001800-0000-1000-8000-00805f9b34fb"
  },
  genericAttribute: {
    uuid: "00001801-0000-1000-8000-00805f9b34fb"
  },
  deviceInformation: {
    uuid: "0000180a-0000-1000-8000-00805f9b34fb",
    chars: {
      name: "00002a29-0000-1000-8000-00805f9b34fb",
      serial: "00002a25-0000-1000-8000-00805f9b34fb",
      revision: "00002a27-0000-1000-8000-00805f9b34fb",
      firmware: "00002a26-0000-1000-8000-00805f9b34fb"
    }
  }
}

export default {
  services
}
