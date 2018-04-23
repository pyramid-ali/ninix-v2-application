import React from 'react';
import ParentSettings from '../App/Containers/ParentSettings';

const initialState = { 
    father: {name: null, birthDate: null, job: null, mobile: null, bloodGroup: null, phone: null, email: null, image: null, progress: null, sync: true, updatedAt: null},
    mother: {name: null, birthDate: null, job: null, mobile: null, bloodGroup: null, phone: null, email: null, image: null, progress: null, sync: true, updatedAt: null}
};
let wrapper, parentContainer, navigation, store;

describe('Test ParentSettings', () => {

  beforeEach(() => {
    store = mockStore(initialState)
    navigation = { goBack: jest.fn(), state: { params: { type: 'father'}} }
    wrapper = shallow(<ParentSettings navigation={navigation} />, { context: { store } }) 
    parentContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(parentContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(parentContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(parentContainer.find('NavigationBar').length).toEqual(1)
    expect(parentContainer.find('SettingComponent').length).toEqual(1)
    expect(parentContainer.find('ModalDeviceConnect').length).toEqual(1)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('mother')).toEqual(initialState.mother)
    expect(wrapper.prop('father')).toEqual(initialState.father)
  });

  test('container actions dispatched correctly & state updated correctly', () => {
    parentContainer.find('NavigationBar').at(0).simulate('pressRightButton')
    expect(parentContainer.state('syncing')).toEqual(true)
    expect(store.getActions()[0].type).toEqual('parent/SAVE_FATHER_INFORMATION')
    store.clearActions()

    parentContainer.setProps({navigation: {...navigation, state: {params: {type: 'mother'}}}})
    parentContainer.find('NavigationBar').at(0).simulate('pressRightButton')
    expect(store.getActions()[0].type).toEqual('parent/SAVE_MOTHER_INFORMATION')
    store.clearActions()

    parentContainer.find('NavigationBar').at(0).simulate('pressLeftButton')
    expect(parentContainer.state('syncing')).toEqual(false)
    expect(store.getActions()).toEqual([{type: 'parent/SET_MOTHER_INFORMATION', payload: initialState.mother}])
    store.clearActions()

    parentContainer.setProps({navigation: {...navigation, state: {params: {type: 'father'}}}})
    parentContainer.find('NavigationBar').at(0).simulate('pressLeftButton')
    expect(parentContainer.state('syncing')).toEqual(false)
    expect(store.getActions()).toEqual([{type: 'parent/SET_FATHER_INFORMATION', payload: initialState.father}])
    store.clearActions()

    parentContainer.find('SettingComponent').at(0).simulate('change', [{key: 'a', value: 'amir'}])
    expect(store.getActions()).toEqual([{ type: 'parent/CHANGE_FATHER_INFORMATION', payload: {a: 'amir'} }])
  });

});