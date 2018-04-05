// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LottieView from 'lottie-react-native'

// Dependencies
import NavigationBar from '../Components/NavigationBar'
import BluetoothAction from '../Redux/BluetoothRedux'

// Styles
import styles from './Styles/DeviceStyle'
import Button from '../Components/Button';
import Colors from '../Themes/Colors';
import Battery from '../Components/Battery';

class Device extends Component {

  componentDidUpdate () {
    if (this.props.bluetooth.isConnected && !this.play) {
      this.lottie.play()
      this.play = true
    }
  }

  render () {
    const { data } = this.props
    const { stream } = data
    const { battery, fullCharge, charging, lowBattery } = stream[stream.length - 1] || { battery: 0, fullCharge: false, charging: false, lowBattery: false }

    return (
      <View style={styles.wrapper}>
        <NavigationBar
          rightButton={this.renderRightBarButton()}
          onPressRightButton={this.pressRightBarButton.bind(this)}
          style={styles.navBar}>

        </NavigationBar>
        <View style={styles.container}>

          <View style={styles.batteryContainer}>
            <Battery
              battery={battery}
              fullCharge={fullCharge}
              charging={charging}
              lowBattery={lowBattery}
              onPress={() => {
                this.props.navigation.navigate('ShowNinixData')
              }}
            />
          </View>



          <View style={styles.statusContainer}>
            { this.renderOnlineStatus() }
          </View>

          <View style={styles.deviceInformation}>
            { this.renderDeviceInformationBox() }
          </View>

        </View>
      </View>

    )
  }

  renderRightBarButton () {
    return (
      <Text style={styles.rightBarButton}>
        <Icon name="search" size={14} color="white"/> Search
      </Text>
    )
  }

  pressRightBarButton () {
    const { navigation } = this.props
    navigation.navigate('AddDevice')
  }

  renderDeviceInformationBox () {

    const { device, bluetooth, navigation } = this.props

    if (bluetooth.isConnected) {
      return (
        <View>
          <Text style={styles.deviceName}>{ device.name || 'getting name' }</Text>
          <Text style={styles.hardwareRevision}>Rev { device.revision }</Text>
          <Text style={styles.firmwareText}>Firmware Version <Text>{ device.firmware || 'N/A' }</Text></Text>
          <Text style={styles.firmwareButton}>UP TO DATE</Text>
        </View>
      )
    }

    if (device.device) {
      return (
        <View>
          <Text >You're last connected to { device.device.name } </Text>
          <Button
            color={Colors.primary}
            containerStyle={styles.disconnectButton}
            onPress={() => this.props.connect(device.device)}
          >
            <Text><Icon name="superpowers" size={20} color={Colors.primary} /> Connect</Text>
          </Button>
        </View>

      )
    }

    return (
      <Button
        color={Colors.primary}
        containerStyle={styles.disconnectButton}
        onPress={() => {
          navigation.navigate('AddDevice')
        }}
      >
        <Text><Icon name="plus" size={20} color={Colors.primary} /> add a Device</Text>
      </Button>
    )
  }

  renderOnlineStatus() {
    if (this.props.bluetooth.isConnected) {
      return (
        <View style={styles.animationWrapper}>
          <Text style={styles.successText}>Online - Connected</Text>
          <LottieView
            style={styles.animationLottie}
            loop
            source={require('../../assets/lotties/scanning_animation.json')}
            ref={lottie => this.lottie = lottie}
          />
          <Button
            containerStyle={styles.disconnectButton}
            color={Colors.white}
            backgroundColor={Colors.alert}
            onPress={() => this.props.disconnect()}
          >
            Disconnect
          </Button>
        </View>
      )
    }

    return (
      <View>
        <Text style={styles.statusText}>No Device Connected</Text>
      </View>
    )
  }

}

Device.navigationOptions = {
  tabBarLabel: 'Device',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="podcast"
      color={tintColor}
    />
  ),
}

const mapStateToProps = (state) => {
  const { bluetooth, data, device } = state
  return {
    bluetooth, data, device
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    disconnect: () => dispatch(BluetoothAction.disconnect()),
    connect: (device) => dispatch(BluetoothAction.connect(device))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device)
