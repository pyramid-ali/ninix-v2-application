import React from 'react';
import SplashScreen from '../App/Containers/SplashScreen';

let wrapper, splashContainer, store;

describe('Test SplashScreen', () => {

  beforeEach(() => {
    store = mockStore()
    wrapper = shallow(<SplashScreen />, { context: { store } }) 
    splashContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(splashContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(splashContainer.length).toEqual(1)
  });

  test('container actions dispatched correctly', () => {
    expect(store.getActions()).toEqual([{type: 'app/INIT'}])
  });

});