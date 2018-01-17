import React, { Component } from 'react'
import { View, StatusBar, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import AccessAbility from '../Redux/AccessAbilityRedux'


// Styles
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

  backHandler() {
    const backAction = NavigationActions.back({
      key: null
    })
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatch(backAction)
      return true
    });
  }

}


export default connect()(RootContainer)
