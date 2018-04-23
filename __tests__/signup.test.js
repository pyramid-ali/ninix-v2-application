import React from 'react';
import Signup from '../App/Containers/Signup';

const initialState = { signup: { fetching: false, error: null, mobile: null } };
let wrapper, signupContainer, navigation, store;

describe('Test Signup', () => {

  beforeEach(() => {
    store = mockStore(initialState)
    navigation = { goBack: jest.fn() } //navigation property
    wrapper = shallow(<Signup navigation={navigation}/>, { context: { store } })
    signupContainer = wrapper.dive() //get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(signupContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(signupContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(signupContainer.find('EntryTemplate').length).toEqual(1)
    expect(signupContainer.find('MobileEntrance').length).toEqual(1)
    expect(signupContainer.find('TokenEntrance').length).toEqual(0)
    expect(signupContainer.find('PasswordEntrance').length).toEqual(0)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('signup')).toEqual(initialState.signup)
  });

  test('container state updated correctly', () => {
    signupContainer.find('MobileEntrance').at(0).simulate('changeValue', '09307473598')
    expect(signupContainer.state('mobile')).toEqual('09307473598')
    signupContainer.setState({stage: 'password'})
    signupContainer.find('PasswordEntrance').at(0).simulate('changeValue', '123456')
    expect(signupContainer.state('newPassword')).toEqual('123456')
  });

  test('container state reset correctly', () => {
    signupContainer.find('EntryTemplate').at(0).simulate('PressLeftBarButton')
    expect(signupContainer.state()).toEqual({ stage: 'mobile', mobile: '09', token: '', password: '', newPassword: ''})
  });

  test('container actions dispatched correctly', () => {
    signupContainer.find('MobileEntrance').at(0).simulate('press')
    expect(store.getActions()[0].type).toEqual('SIGNUP_REQUEST_TOKEN')
    expect(store.getActions()[0].mobile).toEqual('09')
    store.clearActions()

    signupContainer.setState({stage: 'token'})
    signupContainer.find('TokenEntrance').at(0).simulate('finish')
    expect(store.getActions()[0].type).toEqual('SIGNUP_CHECK_TOKEN')
    expect(store.getActions()[0].token).toEqual(undefined)
    store.clearActions()

    signupContainer.setState({stage: 'password'})
    signupContainer.find('PasswordEntrance').at(0).simulate('accept')
    expect(store.getActions()).toEqual([{"actions": [{"routeName": "Main", "type": "Navigation/NAVIGATE"}], "index": 0, "key": undefined, "type": "Navigation/RESET"}])
  });

});