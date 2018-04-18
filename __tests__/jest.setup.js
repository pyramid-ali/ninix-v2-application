import 'raf/polyfill';
import 'jsdom-global/register';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { configure, shallow, render, mount } from 'enzyme';

configure({ adapter: new Adapter()});
global.mockStore = configureStore();
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.configureStore = configureStore;
global.Provider = Provider;