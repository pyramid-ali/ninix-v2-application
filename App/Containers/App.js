// import libraries
import React, { Component } from 'react'
import { Provider } from 'react-redux'

// import dependencies
import '../Config'
import createStore from '../Redux'
import DebugConfig from '../Config/DebugConfig'
import RootContainer from './RootContainer'


// create store
export const store = createStore()

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
