import React, { Component } from 'react'
import { View, StatusBar, NetInfo } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import AccessAbility from '../Redux/AccessAbilityRedux'
import Connector from '../Bluetooth/Connector'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  componentDidMount() {
    console.log('root container component did mount')
    const { changeNetInfo, checkConnectivity } = this.props
    NetInfo.addEventListener('change', (event) => {
      changeNetInfo(event)
    })
    Connector.addEventListener()
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
    checkConnectivity: (status) => dispatch(AccessAbility.networkConnectivity(status))
  }
}

export default connect(null, mapDispatchToProps)(RootContainer)
