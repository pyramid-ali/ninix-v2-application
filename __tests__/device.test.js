import React from 'react';
import Device from '../App/Containers/Device';

const initialState = {
    device: { device: null, name: null, firmware: null, revision: null, serial: null},
    bluetooth: { state: null, devices: [], isConnected: false, isConnecting: false, isScanning: false, isInitiating: false, error: null, isSyncing: false, successSync: false },
    data: { stream: [], sync: [], temp: []}
};
let wrapper, deviceContainer, navigation, store;

describe('Test addDevice', () => {

  beforeEach(() => {
    console.error = jest.fn() //hide console.error warnings
    store = mockStore(initialState)
    navigation = { addListener: jest.fn() }
    wrapper = shallow(<Device navigation={navigation} />, { context: { store } }) 
    deviceContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(deviceContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(deviceContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(deviceContainer.find('Battery').length).toEqual(0)
    expect(deviceContainer.find('Badge').length).toEqual(0)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('device')).toEqual(initialState.device)
    expect(wrapper.prop('bluetooth')).toEqual(initialState.bluetooth)
    expect(wrapper.prop('data')).toEqual(initialState.data)
  });

  test('container actions dispatched correctly', () => {
    deviceContainer.setProps({ bluetooth: {...initialState.bluetooth, isConnected: true}})
    deviceContainer.find('Button').at(0).simulate('press')
    expect(store.getActions()).toEqual([{type: 'bluetooth/TURN_OFF_DEVICE'}])
    store.clearActions()
    deviceContainer.find('Button').at(1).simulate('press')
    expect(store.getActions()).toEqual([{type: 'bluetooth/DISCONNECT'}])
    store.clearActions()

    deviceContainer.setProps({
        bluetooth: {...initialState.bluetooth, isConnected: false},
        device: {...initialState.device, device: 'device'}
    })
    deviceContainer.find('Button').at(0).simulate('press')
    expect(store.getActions()).toEqual([{type: 'bluetooth/RECONNECT'}])
  });

});