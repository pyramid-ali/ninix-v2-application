import React, { Component } from 'react'
import { View, StatusBar, NetInfo, BackHandler } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import AccessAbility from '../Redux/AccessAbilityRedux'
import Connector from '../Bluetooth/Connector'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  componentDidMount() {

    const { changeNetInfo, checkConnectivity } = this.props
    NetInfo.addEventListener('change', (event) => {
      changeNetInfo(event)
    })
    Connector.addEventListener()
    this.backHandler()
  }

  backHandler() {
    const { nav } = this.props
    const backAction = NavigationActions.back({
      key: null
    })
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatch(backAction)
      return true
    });
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress')
  }

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

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => {
  return {
    changeNetInfo: (status) => dispatch(AccessAbility.networkStatus(status)),
    checkConnectivity: (status) => dispatch(AccessAbility.networkConnectivity(status)),
    dispatch: (action) => dispatch(action)
  }
}

export default connect(null, mapDispatchToProps)(RootContainer)
