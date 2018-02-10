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
  static navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={20}
        name="bullseye"
        color={tintColor}
      />
    ),
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { data } = this.props
    const vitalSigns = data.vitalSigns
    const last = vitalSigns[vitalSigns.length - 1]
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.informationContainer}>
            <ArrowImage containerStyle={styles.imageContainer} source={ require('../Images/login-background.jpg') } />
            <VitalSignsBox vitalSigns={last} />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>Normal Condition</Text>
            <Text style={[styles.status, styles.statusSecond]}>Be relax</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <NotificationNavigation />
        </View>
      </View>
    )
  }
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
