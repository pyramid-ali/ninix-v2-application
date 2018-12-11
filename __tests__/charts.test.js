import React from 'react';
import Charts from '../App/Containers/Charts';

const initialState = {
    data: { stream: [], sync: [], temp: []}
};
let wrapper, chartsContainer, navigation, store;

describe('Test Charts', () => {

  beforeEach(() => {
    store = mockStore(initialState)
    navigation = { addListener: jest.fn() }
    wrapper = shallow(<Charts navigation={navigation} />, { context: { store } }) 
    chartsContainer = wrapper.dive() // get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(chartsContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(chartsContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(chartsContainer.find('CurvedChart').length).toEqual(1)
    expect(chartsContainer.find('SegmentedControl').length).toEqual(1)
  });

  test('container props matches with initialState', () => {
    expect(wrapper.prop('stream')).toEqual(initialState.data.stream)
  });

  test('container state updated correctly', () => {
    chartsContainer.find('SegmentedControl').at(0).simulate('change', 'respiratory')
    expect(chartsContainer.state('item')).toEqual('respiratory')
  });

});