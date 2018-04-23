import React from 'react';
import Login from '../App/Containers/Login';

const initialState = { login: { isFetching: false, error: null} };
let wrapper, loginContainer, navigation, store;

describe('Test Login', () => {

  beforeEach(() => {
    store = mockStore(initialState)
    navigation = { navigate: jest.fn() } //navigation property
    wrapper = shallow(<Login navigation={navigation}/>, { context: { store } }) 
    loginContainer = wrapper.dive() //get one level deep in wrapper
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

  test('container actions dispatched correctly', () => {
    loginContainer.find('TextInputWithIcon').at(0).simulate('changeText', '09307473598')
    loginContainer.find('TextInputWithIcon').at(1).simulate('changeText', '123456')
    loginContainer.find('Button').at(0).simulate('press')
    expect(store.getActions()).toEqual([{type: 'login/REQUEST', mobile: '09307473598', password: '123456'}])
  });

});