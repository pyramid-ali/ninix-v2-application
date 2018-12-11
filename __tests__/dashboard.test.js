import React from 'react';
import Dashboard from '../App/Containers/Dashboard';

const initialState = { data: { stream: [], sync: [], temp: [] } };
let wrapper, dashboardContainer, store;

describe('Test Dashboard', () => {

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<Dashboard />, { context: { store } })
    dashboardContainer = wrapper.dive() //get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(dashboardContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(dashboardContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(dashboardContainer.find('ArrowImage').length).toEqual(1)
    expect(dashboardContainer.find('VitalSignsBox').length).toEqual(1)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('data')).toEqual(initialState.data)
  });

});