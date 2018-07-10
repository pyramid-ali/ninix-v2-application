// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList } from 'react-native'
import { Header, ListItem } from 'react-native-elements'
import _ from 'lodash'

// Dependencies
import BluetoothAction from '../Redux/BluetoothRedux'
import BluetoothState from '../Bluetooth/BluetoothState'
import NinixDevice from '../Components/NinixDevice'
import ModalDeviceConnect from '../Components/ModalDeviceConnect'

// Styles
import styles from './Styles/AddDeviceStyle'
import Colors from '../Themes/Colors'

class AddDevice extends Component {

  constructor(props) {
    super(props)
    this.keyExtractor = item => item.id
  }

  componentDidMount() {
    this.renderItemList = this.renderItemList.bind(this)
  }

  componentWillUnmount() {
    this.props.stopScan()
  }

  render () {
    const scannedDevices = _.values(this.props.scannedDevices).map(item => item.device)
    const {logo, blink, color} = this.getNinixStatus()

    return (
        <View style={styles.container}>

          <Header
            statusBarProps={{backgroundColor: Colors.primary}}
            backgroundColor={Colors.primary}
            centerComponent={{text: 'ADD Device', style: { color: '#fff' }}}
            leftComponent={{icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack()}}
          />

          <View style={{flex: 1}}>
            <NinixDevice
              onPress={this.search.bind(this)}
              logo={logo}
              blink={blink}
              lightColor={color} />
          </View>
          <View style={{flex: 1, backgroundColor: Colors.white}}>
            <Error message={this.props.error}/>
            <Header
              backgroundColor={Colors.dark}
              centerComponent={{ text: 'Available Devices', style: { color: '#fff' } }}
            />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={scannedDevices}
              renderItem={this.renderItemList}
            />
          </View>

          <Modal
            visible={this.props.isConnecting || this.props.isInitiating}
            title={this.props.isConnecting ? 'Connecting...' : 'Setup...'}
            description={this.props.isConnecting ? "We're trying to connect to device, please wait" : "We're working on initial setup, after this you can receive data, please wait"}
          />

        </View>
    )
  }

  getNinixStatus () {
    if (this.props.isConnected) {
      return {
        logo: 'Connected\nTap To cancel',
        blink: false,
        color: Colors.primary
      }
    }

    if (this.props.isScanning) {
      return {
        logo: 'Searching...\nTap To cancel',
        blink: true,
        color: Colors.primary
      }
    }

    switch (this.props.bluetoothState) {
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

  renderItemList ({item}) {
    return (
      <ListItem
        title={item.name}
        subtitle={item.id}
        rightTitle='Connect'
        rightSubtitle={`${item.rssi}db`}
        subtitleStyle={styles.listSubtitle}
        rightSubtitleStyle={styles.listSubtitle}
        leftAvatar={<NinixDevice containerStyle={{flex: -1}} size={35} />}
        titleStyle={{color: Colors.primary}}
        onPress={() => this.props.connect(item)}
        chevron
      />
    )
  }

  search() {
    const { isScanning, isConnected, bluetoothState } = this.props
    if (isConnected) {
      this.props.disconnect()
      return
    }
    if(isScanning) {
      this.props.stopScan()
      return
    }

    if (bluetoothState === BluetoothState.poweredOn) {
      this.props.startScan()
      return
    }

    alert('Please turn on bluetooth')

  }

}

// helper components, if these are general use component, then move them to components folders
function Error(props) {
  if (props.message) {
    return (
      <View style={styles.error}>
        <Text style={styles.white}>Error</Text>
        <Text style={styles.white}>{ props.message }</Text>
      </View>
    )
  }
  return null
}

function Modal(props) {
  return (
    <ModalDeviceConnect
      title={props.title}
      visible={props.visible}
    >
      <Text>{props.description}</Text>
    </ModalDeviceConnect>
  )
}

const mapStateToProps = (state) => {
  const { bluetooth } = state
  return {
    scannedDevices: bluetooth.devices,
    bluetoothState: bluetooth.state,
    isScanning: bluetooth.isScanning,
    isConnecting: bluetooth.isConnecting,
    isInitiating: bluetooth.isInitiating,
    isConnected: bluetooth.isConnected,
    error: bluetooth.error
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
