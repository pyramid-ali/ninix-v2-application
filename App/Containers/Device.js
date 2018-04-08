// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Text, View, StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Header, Button, Badge, ListItem} from 'react-native-elements'

// Dependencies
import Battery from '../Components/Battery'
import BluetoothAction from '../Redux/BluetoothRedux'

// Styles
import styles from './Styles/DeviceStyle'
import Colors from '../Themes/Colors'

class Device extends Component {

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.primary, true)
    })

  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  render () {

    return (
      <View style={styles.container}>

        <Header
          statusBarProps={{backgroundColor: Colors.primary}}
          backgroundColor={Colors.primary}
          centerComponent={{ text: 'DEVICE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'search', color: '#fff', onPress: () => this.props.navigation.navigate('AddDevice') }}
        />

        { this.renderContent() }

      </View>
    )
  }

  renderContent () {

    const { device, bluetooth } = this.props

    if (bluetooth.isConnected) {
      return this.renderConnected()
    }

    if (device.device) {
      return this.renderReconnect()
    }

    return this.renderNotConnected()
  }

  renderNotConnected () {
    return (
      <View style={styles.notConnectedContainer}>
        <Text style={styles.notConnectedTitle}>
          First Time Connect
        </Text>

        <Text style={styles.notConnectedDescription}>
          with using below button search and connect to a ninix device
        </Text>

        <Button
          buttonStyle={styles.connectButton}
          onPress={() => this.props.navigation.navigate('AddDevice')}
          icon={
            <Icon
              name='search'
              size={15}
              color='white'
            />
          }
          title='Search and Connect'
        />

      </View>
    )
  }

  renderReconnect () {

    const { device, bluetooth } = this.props

    return (
      <View style={styles.notConnectedContainer}>

        <Text style={styles.notConnectedTitle}>
          { device.device.name || 'unknown' }
        </Text>
        <Badge
          value={'Disconnected'}
          textStyle={{ color: 'white' }}
          containerStyle={{ backgroundColor: 'red'}}
        />

        <Text style={styles.notConnectedDescription}>
          if you want to connect to a new device press search button at top right bar
        </Text>

        <Button
          buttonStyle={styles.connectButton}
          loading={bluetooth.isConnecting}
          loadingStyle={{width: 100, padding: 5}}
          icon={
            <Icon
              name='refresh'
              size={15}
              color='white'
            />
          }
          title='Reconnect'
        />

      </View>
    )
  }

  renderConnected () {

    const { data, device } = this.props
    const { stream } = data
    const { battery, fullCharge, charging, lowBattery } = stream[stream.length - 1] || { battery: 0, fullCharge: false, charging: false, lowBattery: false }

    return (
      <View style={styles.connectedContainer}>
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

        <View style={{flex: 1}}>

          <ListItem
            title='Status'
            leftIcon={{name: "check"}}
            rightTitle="Connected"
            rightTitleStyle={styles.connectedRightTitle}
          />

          <ListItem
            title='Device'
            subtitle={'Revision V' + device.revision}
            subtitleStyle={styles.connectedListSubtitle}
            leftIcon={{name: "details"}}
            rightTitle={device.device.name}
            rightTitleStyle={styles.connectedRightTitle}
          />

          <ListItem
            title='Firmware Version'
            subtitle={'Latest Version'}
            subtitleStyle={styles.connectedListSubtitle}
            leftIcon={{name: "donut-large"}}
            rightTitle={'V' + device.firmware}
            rightTitleStyle={styles.connectedRightTitle}
          />

        </View>

        <Button
          buttonStyle={styles.disconnectButton}
          icon={
            <Icon
              name='unlink'
              size={15}
              color='white'
            />
          }
          title='Disconnect'
        />

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
    connect: (device) => dispatch(BluetoothAction.connect(device)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device)
