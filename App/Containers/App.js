import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import moment from 'moment'

// create our store
export const store = createStore()

moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past:   "%s ago",
    s  : 'Right Now',
    ss : '%ds',
    m:  "1m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
    M:  "1m",
    MM: "%dm",
    y:  "1y",
    yy: "%dy"
  }
});

class App extends Component {
  render () {
    return (
      <Provider store={store}>
          <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
