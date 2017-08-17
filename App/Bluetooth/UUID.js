export const serviceUUIDs = ["00001523-0000-1000-8000-00805f9b34fb"]

export const characteristics = {
  realTime: "00001524-0000-1000-8000-00805f9b34fb",
  sync: "00001525-0000-1000-8000-00805f9b34fb",
  write: "00001526-0000-1000-8000-00805f9b34fb"
}

export const characteristicsUUIDs = () => {
  let result = []
  for (const characteristic of characteristics) {
    result.push(characteristics[characteristic])
  }
  return result
}
