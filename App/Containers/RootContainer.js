// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'

// Dependencies
import ReduxNavigation from '../Navigation/ReduxNavigation'

// Styles
import styles from './Styles/RootContainerStyles'
import Colors from '../Themes/Colors'

class RootContainer extends Component {

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          barStyle='dark-content'
          translucent={false}
          backgroundColor={Colors.gray}
        />
        <ReduxNavigation />
      </View>
    )
  }

}

export default connect()(RootContainer)
