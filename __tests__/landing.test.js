import React from 'react';
import Landing from '../App/Containers/Landing';


let wrapper, landingContainer, navigation, store;

describe('Test Landing', () => {

  beforeEach(() => {
    store = mockStore()
    navigation = { navigate: jest.fn() }
    wrapper = shallow(<Landing navigation={navigation} />, { context: { store } }) 
    landingContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(landingContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(landingContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(landingContainer.find('Introduction').length).toEqual(5)
  });

  test('container actions dispatched correctly', () => {
    landingContainer.find('TouchableOpacity').at(0).simulate('press')
    expect(store.getActions()).toEqual([{type: 'app/DID_APP_INTRODUCE'}])
  });

});