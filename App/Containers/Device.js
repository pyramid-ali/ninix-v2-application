import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DeviceStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

class Device extends Component {
  static navigationOptions = {
    tabBarLabel: 'Device',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={20}
        name="podcast"
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
      <View style={styles.wrapper}>
        <View style={styles.navBar}>
          <Text style={[styles.leftBarButton, styles.barButton]}>
            <Icon name="angle-left" size={22} color="white" />
          </Text>
          <Text style={styles.title}>Device</Text>
          <Text
            onPress={() => {
              this.props.navigation.navigate('AddDevice')
            }}
            style={[styles.rightBarButton, styles.barButton]}>
            <Icon name="plus" size={22} color="white" />
          </Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.deviceContainer}>
            <View style={styles.deviceShapeContainer}>
              <View style={styles.deviceShape}>
                <Text style={styles.batteryCharge}>72%</Text>
                <Text style={styles.batteryChargeFooter}>Battery Charge</Text>
              </View>
              <View style={styles.deviceShapeHead}/>
            </View>
            <View style={styles.firmwareDetails}>
              <Text style={styles.firmwareText}>Firmware Version <Text>v1.0.4</Text></Text>
              <Text style={styles.firmwareButton}>Check for updates</Text>
            </View>
          </View>
          <View style={styles.logContainer}>
            <Text>this is log</Text>
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Device)
