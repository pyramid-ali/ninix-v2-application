import Ble from '../Services/Ble'
import BluetoothAction from '../Redux/BluetoothRedux'
import BluetoothStates from './BluetoothState'
import { store } from '../Containers/App'
import {mainService, serviceUUIDs} from './UUID'
import DataAction from '../Redux/DataRedux'
import moment from 'moment'
const base64 = require('base-64');

class Connector {

  constructor() {

  }

  addEventListener() {
    // check for first time
    Ble.state().then((state) => {
      store.dispatch(BluetoothAction.changeState(state))
    })

    // listen to changes
    Ble.addListener((state) => {
      store.dispatch(BluetoothAction.changeState(state))
    })
  }

  scanDevices() {
    const { bluetooth } = store.getState()

    if (bluetooth.state === BluetoothStates.poweredOn) {
      store.dispatch(BluetoothAction.startScan())
      Ble.scanDevice(serviceUUIDs, {allowDuplicates: false}, (error, device) => {
        store.dispatch(BluetoothAction.addDevice(device))
      })
      return true
    }
    // TODO: add appropriate action for displaying bluetooth is off
    return false

  }

  stopScan() {
    store.dispatch(BluetoothAction.stopScan())
    Ble.stopScan()
  }

  connect(device) {
    device.onDisconnected((error, device) => {
      console.log(error, 'disconnect')
      console.log('disconnect time', moment())
      store.dispatch(BluetoothAction.disconnect())
    })
    return device.connect()
  }

  discover(device) {
    console.log('connect time', moment())
    return device.discoverAllServicesAndCharacteristics()
  }

  services(device) {
    return device.services()
  }

  characteristicsForService(device) {
    return device.characteristicsForService(mainService)
  }


  notify (characteristic) {
    characteristic.monitor( (error, char) => {
      if(char) {
        let str = base64.decode(char.value)
        let bytes = []
        for (let i = 0; i < str.length; ++i) {
          const code = str.charCodeAt(i)
          bytes = bytes.concat([code])
        }
        store.dispatch(DataAction.receiveData(bytes, moment().unix()))
      }
    })
    return true
  }

}

const instance = new Connector()
export default instance
