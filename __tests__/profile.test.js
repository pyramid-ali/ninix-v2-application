import React from 'react';
import Profile from '../App/Containers/Profile';

const initialState = {
    baby: {name: null, birthDate: null, gender: null, image: null, progress: null, bloodGroup: null, changeDate: null, sync: true},
    father: {name: null, birthDate: null, job: null, mobile: null, bloodGroup: null, phone: null, email: null, image: null, progress: null, sync: true, updatedAt: null},
    mother: {name: null, birthDate: null, job: null, mobile: null, bloodGroup: null, phone: null, email: null, image: null, progress: null, sync: true, updatedAt: null}
};
let wrapper, profileContainer, navigation, store;

describe('Test Profile', () => {

  beforeEach(() => {
    store = mockStore(initialState)
    navigation = { addListener: jest.fn() } //navigation property
    wrapper = shallow(<Profile navigation={navigation}/>, { context: { store } }) 
    profileContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(profileContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(profileContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(profileContainer.find('EditableImage').length).toEqual(1)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('baby')).toEqual(initialState.baby)
    expect(wrapper.prop('father')).toEqual(initialState.father)
    expect(wrapper.prop('mother')).toEqual(initialState.mother)
  });

});