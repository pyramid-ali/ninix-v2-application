// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Dependencies
import BluetoothAction from '../Redux/BluetoothRedux'
import BluetoothState from '../Bluetooth/BluetoothState'
import NavigationBar from '../Components/NavigationBar'
import NinixDevice from '../Components/NinixDevice'
import ModalDeviceConnect from '../Components/ModalDeviceConnect'
import FoundedDeviceItem from '../Components/FoundedDeviceItem'
import _ from 'lodash'

// Styles
import styles from './Styles/AddDeviceStyle'
import Colors from '../Themes/Colors'
import {Header} from 'react-native-elements';

// TODO: change list Item
class AddDevice extends Component {

  render () {
    const { bluetooth } = this.props
    const data = Object.keys(bluetooth.devices).map((item) => bluetooth.devices[item].device)
    const {logo, blink, color} = this.getNinixStatus(bluetooth)

    return (
        <View style={styles.container}>

          <Header
            statusBarProps={{backgroundColor: Colors.primary}}
            backgroundColor={Colors.primary}
            centerComponent={{ text: 'ADD Device', style: { color: '#fff' } }}
            leftComponent={{ icon: 'arrow-back', color: '#fff' }}
          />

          <View style={{flex: 1}}>
            <NinixDevice
              onPress={this.search.bind(this)}
              logo={logo}
              blink={blink}
              lightColor={color} />
          </View>
          { this.props.bluetooth.error ? this.renderError() : null}
          <FlatList
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={this.separatorComponent.bind(this)}
            ListHeaderComponent={this.listHeaderComponent.bind(this)}
            style={{flex: 1, backgroundColor: Colors.white}}
            data={data}
            renderItem={({item}) => this.renderItem(item)}
          />
          { this.renderModal() }
        </View>
    )
  }

  getNinixStatus (bluetooth) {
    if (bluetooth.isConnected) {
      return {
        logo: 'Connected\nTap To cancel',
        blink: false,
        color: Colors.primary
      }
    }

    if (bluetooth.isScanning) {
      return {
        logo: 'Searching...\nTap To cancel',
        blink: true,
        color: Colors.primary
      }
    }

    switch (bluetooth.state) {
      case BluetoothState.poweredOn:
        return {
          logo: 'Start Scan',
          blink: false,
          color: '#3498DB'
        }
      default:
        return {
          logo: 'Bluetooth is off',
          blink: false,
          color: Colors.alert
        }
    }
  }

  renderItem (device) {
    return (
      <FoundedDeviceItem onPress={() => this.props.connect(device)} text={device.name} key={device.id} />
    )
  }

  listHeaderComponent () {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Available Ninix Devices</Text>
      </View>
    )
  }

  separatorComponent () {
    return (
      <View style={styles.line} />
    )
  }

  search() {
    const { isScanning, isConnected, state } = this.props.bluetooth
    if (isConnected) {
      this.props.disconnect()
      return
    }
    if(isScanning) {
      this.props.stopScan()
      return
    }

    if (state === BluetoothState.poweredOn) {
      this.props.startScan()
      return
    }

    alert('Please turn on bluetooth')

  }

  renderError () {
    return (
      <View style={styles.error}>
        <Text style={styles.white}>Error</Text>
        <Text style={styles.white}>{ _.truncate(this.props.bluetooth.error) }</Text>
      </View>
    )
  }

  renderModal () {
    const { bluetooth } = this.props
    return (
      <ModalDeviceConnect
        title='Connecting... '
        visible={bluetooth.isConnecting}
        buttons={[
          {
            text: 'cancel',
            onPress: () => {
              this.props.cancelConnection()
            }
          }
        ]}
      >
        <Text>We're connecting to NINIX</Text>
      </ModalDeviceConnect>
    )
  }

}

const mapStateToProps = (state) => {
  const { bluetooth } = state
  return {
    bluetooth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startScan: () => dispatch(BluetoothAction.startScan()),
    stopScan: () => dispatch(BluetoothAction.stopScan()),
    connect: (device) => dispatch(BluetoothAction.connect(device)),
    disconnect: () => dispatch(BluetoothAction.disconnect()),
    cancelConnection: () => dispatch(BluetoothAction.cancelConnection())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice)
