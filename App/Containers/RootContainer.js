// import libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'

// import Dependencies
import ReduxNavigation from '../Navigation/ReduxNavigation'

// import Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          barStyle='dark-content'
          translucent={true}
          backgroundColor='transparent'
        />
        <ReduxNavigation />
      </View>
    )
  }

}

export default connect()(RootContainer)
