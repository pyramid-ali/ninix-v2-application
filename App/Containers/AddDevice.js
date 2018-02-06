// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Dependencies
import BluetoothAction from '../Redux/BluetoothRedux'
import BluetoothState from '../Bluetooth/BluetoothState'
import Connector from '../Bluetooth/Connector'
import NavigationBar from '../Components/NavigationBar'
import NinixDevice from '../Components/NinixDevice'
import ModalDeviceConnect from '../Components/ModalDeviceConnect'
import FoundedDeviceItem from '../Components/FoundedDeviceItem'

// Styles
import styles from './Styles/AddDeviceStyle'
import Colors from '../Themes/Colors'


class AddDevice extends Component {

  render () {
    const { bluetooth } = this.props
    const data = bluetooth.devices

    const {logo, blink, color} = (() => {

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
    })();

    return (
      <View style={{flex: 1}}>
        <NavigationBar
          style={styles.navBar}
          textStyle={styles.title}
          leftButton={this.renderLeftBarButton()}
          onPressLeftButton={() => {
            this.props.navigation.goBack(null)
            Connector.stopScan()
          }}
        >
          Add Device
        </NavigationBar>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <NinixDevice
              onPress={this.search.bind(this)}
              logo={logo}
              blink={blink}
              lightColor={color} />
          </View>
          <FlatList
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={this.separatorComponent.bind(this)}
            ListHeaderComponent={this.listHeaderComponent.bind(this)}
            style={{flex: 1, backgroundColor: Colors.white}}
            data={data}
            renderItem={({item}) => this.renderItem(item)}
          />
        </View>
        <ModalDeviceConnect
          buttons={[{
            onPress: () => this.props.cancelConnection(),
            text: 'Cancel'
          }]}
          visible={bluetooth.isConnecting}>
          <Text>We're connecting to NINIX_DEMO</Text>
        </ModalDeviceConnect>
      </View>
    )
  }

  renderLeftBarButton() {
    return (
      <View style={styles.backButton}>
        <Icon style={styles.backButtonIcon} name="angle-left" size={22} color="white" />
        <Text style={styles.backButtonText}>Back</Text>
      </View>
    )
  }

  renderItem (device) {
    return (
      <FoundedDeviceItem onPress={() => this.connect(device)} text={device.name} key={device.id} />
    )
  }

  connect (device) {
    this.props.startConnection(device)
  }

  listHeaderComponent () {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Founded Devices</Text>
      </View>
    )
  }

  separatorComponent () {
    return (
      <View style={styles.line} />
    )
  }

  search() {
    const { isScanning, isConnected } = this.props.bluetooth
    if (isConnected) {
      Connector.disconnect()
      return
    }
    if(isScanning) {
      Connector.stopScan()
      return
    }
    Connector.scanDevices()
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
    startConnection: (device) => dispatch(BluetoothAction.connect(device)),
    cancelConnection: () => dispatch(BluetoothAction.cancel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice)
