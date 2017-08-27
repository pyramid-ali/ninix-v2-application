import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../../Components/NavigationBar'

// Styles
import styles from '../Styles/DeviceStyle'


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
        <NavigationBar
          rightButton={this.renderRightBarButton()}
          onPressRightButton={this.pressRightBarButton.bind(this)}
          style={styles.navBar}
        >
          Device
        </NavigationBar>
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

  renderRightBarButton () {
    return (
      <Text style={styles.rightBarButton}>
        ADD <Icon name="plus" size={14} color="white"/>
      </Text>
    )
  }

  pressRightBarButton () {
    const { navigation } = this.props
    navigation.navigate('AddDevice')
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
