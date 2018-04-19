import React from 'react';
import AddDevice from '../App/Containers/AddDevice';

const initialState = { bluetooth: { state: null, devices: [], isConnected: false, isConnecting: false, isScanning: false, isInitiating: false, error: null, isSyncing: false, successSync: false } };

let wrapper, deviceContainer, navigation, store;

describe('Test addDevice', () => {

  beforeEach(() => {
    console.error = jest.fn() //hide console.error warnings
    store = mockStore(initialState)
    wrapper = shallow(<AddDevice />, { context: { store } }) 
    deviceContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(deviceContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(deviceContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(deviceContainer.find('NinixDevice').length).toEqual(1)
    expect(deviceContainer.find('ModalDeviceConnect').length).toEqual(1)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('bluetooth')).toEqual(initialState.bluetooth)
  });

  test('container actions dispatched correctly', () => {
    deviceContainer.setProps({ bluetooth: {...initialState.bluetooth, isConnected: true}})
    deviceContainer.find('NinixDevice').at(0).simulate('press')
    expect(store.getActions()).toEqual([{type: 'bluetooth/DISCONNECT'}])
    store.clearActions()

    deviceContainer.setProps({ bluetooth: {...initialState.bluetooth, isConnected: false, isScanning: true}})
    deviceContainer.find('NinixDevice').at(0).simulate('press')
    expect(store.getActions()).toEqual([{type: 'bluetooth/STOP_SCAN'}])
    store.clearActions()

    deviceContainer.setProps({ bluetooth: {...initialState.bluetooth, isConnected: false, isScanning: false, state: 'PoweredOn'}})
    deviceContainer.find('NinixDevice').at(0).simulate('press')
    expect(store.getActions()).toEqual([{type: 'bluetooth/START_SCAN'}])
    store.clearActions()
  });

});