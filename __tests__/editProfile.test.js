import React from 'react';
import EditProfile from '../App/Containers/EditProfile';

const initialState = {
    baby: {name: null, birthDate: null, gender: null, image: null, progress: null, bloodGroup: null, changeDate: null, sync: true},
    father: {name: null, birthDate: null, job: null, mobile: null, bloodGroup: null, phone: null, email: null, image: null, progress: null, sync: true, updatedAt: null},
    mother: {name: null, birthDate: null, job: null, mobile: null, bloodGroup: null, phone: null, email: null, image: null, progress: null, sync: true, updatedAt: null}
};
let wrapper, editProfileContainer, navigation, store;

describe('Test EditProfile', () => {

  beforeEach(() => {
    store = mockStore(initialState)
    navigation = { navigate: jest.fn(), goBack: jest.fn() }
    wrapper = shallow(<EditProfile navigation={navigation} />, { context: { store } }) 
    editProfileContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(editProfileContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(editProfileContainer.length).toEqual(1)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('baby')).toEqual(initialState.baby)
    expect(wrapper.prop('father')).toEqual(initialState.father)
    expect(wrapper.prop('mother')).toEqual(initialState.mother)
  });

});