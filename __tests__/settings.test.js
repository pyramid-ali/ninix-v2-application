import React from 'react';
import Settings from '../App/Containers/Settings';

let wrapper, settingsContainer, store;

describe('Test Settings', () => {

  beforeEach(() => {
    store = mockStore()
    wrapper = shallow(<Settings navigation={navigation} />, { context: { store } }) 
    settingsContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(settingsContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(settingsContainer.length).toEqual(1)
  });

  test('container actions dispatched correctly & state updated correctly', () => {
    parentContainer.find('ListItem').at(0).simulate('press')
    expect(store.getActions()).toEqual([{type: 'app/LOGOUT'}])
  });

});