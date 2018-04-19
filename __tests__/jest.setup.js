import 'raf/polyfill';
import 'jsdom-global/register';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter()});
global.mockStore = configureStore();
global.shallow = shallow;
global.configureStore = configureStore;
