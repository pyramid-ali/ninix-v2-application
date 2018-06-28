import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Header, Button } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import FirmwareAction from '../Redux/FirmwareRedux'

// Styles
import styles from './Styles/FirmwareUpdateStyle'
import Colors from '../Themes/Colors'


class FirmwareUpdate extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: Colors.primary}}
          backgroundColor={Colors.primary}
          leftComponent={{ icon: 'arrow-left', type: 'material-community', color: '#fff', onPress: () => this.props.navigation.goBack() }}
          centerComponent={{ text: 'Firmware', style: { color: '#fff' } }}
        />
        <View style={styles.wrapper}>
          { this.renderContent() }
        </View>

      </View>
    )
  }

  renderContent() {
    const { device, bluetooth, firmware } = this.props
    if (!bluetooth.isConnected) {
      return (
        <Text style={styles.notConnected}>You're not connected to any devices</Text>
      )
    }

    if (!firmware.version) {
      return (
        <View>
          <Text style={styles.text}>Current version: {device.firmware}</Text>
          <Button loading={firmware.fetch} buttonStyle={styles.button} title='Check for Updates' onPress={this.props.checkLatestVersion.bind(this)} />
          <Text style={styles.error}>{firmware.error}</Text>
        </View>
      )
    }

    if (device.firmware < firmware.version) {
      return (
        <View>
          <Text style={styles.text}>you're using V{ device.firmware } of ninix, there is a new version available: V{firmware.version} </Text>
          <Text style={styles.description}>{ firmware.description }</Text>
          <Button buttonStyle={styles.button} title='Update Now' />
        </View>
      )
    }

    return (
      <Text>You're using latest version of ninix firmware: V{ device.firmware }</Text>
    )
  }
}

const mapStateToProps = (state) => {
  const { device, bluetooth, firmware } = state
  return {
    device,
    bluetooth,
    firmware
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLatestVersion: () => dispatch(FirmwareAction.checkLatestVersion())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirmwareUpdate)
