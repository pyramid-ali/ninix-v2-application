import React from 'react';
import Login from '../App/Containers/Login';

const initialState = { login: { isFetching: false, error: null} };
let wrapper, loginContainer, navigation, store;

describe('Test Login', () => {

  beforeEach(() => {
    console.error = jest.fn() //hide console.error warnings
    store = mockStore(initialState)
    navigation = { navigate: jest.fn() } //navigation property
    wrapper = shallow(<Login navigation={navigation}/>, { context: { store } }) 
    loginContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(loginContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(loginContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(loginContainer.find('TextInputWithIcon').length).toEqual(2)
    expect(loginContainer.find('ActivityIndicator').length).toEqual(0)
    expect(loginContainer.find('Button').length).toEqual(1)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('login')).toEqual(initialState.login)
  });

  test('container state updated correctly', () => {
    loginContainer.find('TextInputWithIcon').forEach(child => child.simulate('changeText', 'value changed'))
    expect(loginContainer.state('mobile')).toEqual('value changed')
    expect(loginContainer.state('password')).toEqual('value changed')
  });

});