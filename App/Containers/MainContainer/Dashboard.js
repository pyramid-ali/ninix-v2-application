import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/DashboardStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import NotificationNavigation from '../../Navigation/NotificationNavigation'
import ArrowImage from '../../Components/ArrowImage'
import VitalSignsBox from '../../Components/VitalSignsBox'

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
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.informationContainer}>
            <ArrowImage containerStyle={styles.imageContainer} />
            <VitalSignsBox/>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>Lorem ipsum dolor sit amet</Text>
            <Text style={[styles.status, styles.statusSecond]}>Lorem ipsum dolor sit amet</Text>
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
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
