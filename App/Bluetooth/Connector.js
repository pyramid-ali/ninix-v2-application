import Ble from '../Services/Ble'
import BluetoothAction from '../Redux/BluetoothRedux'
import BluetoothStates from './BluetoothState'
import { store } from '../Containers/App'
import { serviceUUIDs } from './UUID'

class Connector {

  constructor() {
    this.scanErrors = []
    this.devices = []
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
      // TODO: Dispatch an action for start scanning
      this.scanSubscription = Ble.scanDevice(serviceUUIDs, null, (error, device) => {

        if (error) {
          this.scanErrors.push(error)
          return null
        }
        this.devices.push(device)
      })
      return
    }
    // TODO: add appropriate action for displaying bluetooth is off
    console.log('scan not started', bluetooth.state)

  }

}

const instance = new Connector()
export default instance
