import React from 'react';
import EssentialInformationSlider from '../App/Containers/EssentialInformationSlider';

let wrapper, sliderContainer, store;

describe('Test slider', () => {

  beforeEach(() => {
    store = mockStore()
    wrapper = shallow(<EssentialInformationSlider />, { context: { store } }) 
    sliderContainer = wrapper.dive() //get one level deep in wrapper
  });

  test('check snapshot', () => {
    expect(sliderContainer).toMatchSnapshot()
  });

  test('container rendered correctly', () => {
    expect(sliderContainer.length).toEqual(1)
  });

  test('container childrens called correctly', () => {
    expect(sliderContainer.find('SingleInputPage').length).toEqual(1)
  });

  test('container state updated correctly', () => {
    sliderContainer.find('SingleInputPage').at(0).simulate('change', 100)
    expect(sliderContainer.state('height')).toEqual(100)
  });

});