import React from 'react';
import BabySettings from '../App/Containers/BabySettings';

const initialState = { baby: { name: null, birthDate: null, gender: null, image: null, progress: null, bloodGroup: null, changeDate: null, sync: true} };
let wrapper, babyContainer, navigation, store;

describe('Test addDevice', () => {

  beforeEach(() => {
    console.error = jest.fn() //hide console.error warnings
    store = mockStore(initialState)
    navigation = { goBack: jest.fn() }
    wrapper = shallow(<BabySettings navigation={navigation} />, { context: { store } }) 
    babyContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(babyContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(babyContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(babyContainer.find('SettingComponent').length).toEqual(1)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('baby')).toEqual(initialState.baby)
  });

  test('container actions dispatched correctly', () => {
    babyContainer.find('SettingComponent').simulate('change')
    expect(store.getActions()).toEqual([{type: 'baby/CHANGE_INFORMATION', payload: null}])
  });

});