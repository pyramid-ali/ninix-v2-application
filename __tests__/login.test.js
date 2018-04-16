import React from 'react';
import { shallow } from 'enzyme';
import Login from '../App/Containers/Login';
import configureStore from 'redux-mock-store';


const initialState = { login: { isFetching: false, error: null } };
const mockStore = configureStore();
let store, shallowContainer, loginContainer, navigation;

describe('Test Login', () => {

  beforeEach(() => {
    store = mockStore(initialState)
    console.error = jest.fn() //hide console.error warnings
    navigation = { navigate: jest.fn() } //navigation property
    shallowContainer = shallow(<Login navigation={navigation}/>, { context: { store } }) //contains constructor & render()
    loginContainer = shallowContainer.dive() //remove wrapper of login
  });

  test('container rendered correctly', () => {
    expect(loginContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(loginContainer.find('TextInputWithIcon').length).toEqual(2)
    expect(loginContainer.find('ActivityIndicator').length).toEqual(0)
    expect(loginContainer.find('Button').length).toEqual(1)
  });

  test('container state updated correctly', () => {
    loginContainer.find('TextInputWithIcon').forEach(child => child.simulate('changeText', 'value changed'))
    expect(loginContainer.state('mobile')).toEqual('value changed')
    expect(loginContainer.state('password')).toEqual('value changed')
  });

});