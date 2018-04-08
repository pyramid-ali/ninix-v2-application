// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Dependencies
import NotificationNavigation from '../Navigation/NotificationNavigation'
import ArrowImage from '../Components/ArrowImage'
import VitalSignsBox from '../Components/VitalSignsBox'

// Styles
import styles from './Styles/DashboardStyle'

class Dashboard extends Component {

  render () {
    const { data } = this.props
    const last = data.stream[data.stream.length - 1]
    // TODO: we must show here the condition of device, if device is not connected we show last time connected
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.informationContainer}>
            <ArrowImage containerStyle={styles.imageContainer} source={ require('../Images/login-background.jpg') } />
            <VitalSignsBox vitalSigns={last} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>No Device Connected</Text>
            <Text style={[styles.status, styles.statusSecond]}>tap to connect</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <NotificationNavigation />
        </View>
      </View>
    )
  }
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="bullseye"
      color={tintColor}
    />
  ),
}

const mapStateToProps = (state) => {
  const { data } = state
  return {
    data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
