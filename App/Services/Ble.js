import React, { Component} from 'react'
import { connect } from 'react-redux'
import { BleManager } from 'react-native-ble-plx'
import { store } from '../Containers/App'

class Ble {

  constructor() {
    this.manager = new BleManager()
  }

  addListener(listener, emitCurrentState) {
    this.subscription = this.manager.onStateChange(listener, emitCurrentState)
  }

  removeListener() {
    this.subscription.remove()
  }

  scanDevice(uuidArray, options, listener) {
    return this.manager.startDeviceScan(uuidArray, options, listener)
  }

  stopScan() {
    this.manager.stopDeviceScan()
  }

  state() {
    return this.manager.state()
  }

}

const instance = new Ble()
Object.freeze(instance)

export default instance
