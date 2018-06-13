// Libraries
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button, ListItem, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

// Dependencies
import Banner from '../Components/Banner'
import DataDisplay from '../Transform/DataDisplay'
import BluetoothAction from '../Redux/BluetoothRedux'

// Styles
import styles from './Styles/DashboardStyle'
import Colors from '../Themes/Colors'

class Dashboard extends Component {

  // TODO: decide what should we do for status bar background

  status = {
    notConnected: {
      title: 'Not Connected',
      subtitle: 'There is no connection between application and gadget',
      type: 'typical',
      button: <Button
        title='Connect'
        onPress={() => {this.props.navigation.navigate('AddDevice')}}
        containerStyle={styles.outer}
        buttonStyle={[styles.buttonStyle, {backgroundColor: Colors.primary}]}
      >
      </Button>
    },
    connecting: {
      title: 'Connecting',
      subtitle: 'We\'re trying to connect to ninix gadget',
      type: 'warning',
      button: <Button
        loading
        disabled
        title='Connecting'
        containerStyle={styles.outer}
        buttonStyle={[styles.buttonStyle, {backgroundColor: Colors.normal}]}
      >
      </Button>
    },
    connected: {
      title: 'Connected',
      subtitle: 'Receiving data from ninix gadget',
      type: 'success',
      button: <Button
        title='Disconnect'
        onPress={() => this.props.disconnect()}
        containerStyle={styles.outer}
        buttonStyle={[styles.buttonStyle, {backgroundColor: Colors.alert}]}
      >
      </Button>
    },
    disconnected: {
      title: 'Disconnected',
      subtitle: this.props.disconnectError ? this.props.disconnectError : 'you\'re disconnected from ninix',
      type: 'alert',
      button: <Button
        title='Reconnect'
        onPress={() => this.props.connect(this.props.device)}
        containerStyle={styles.outer}
        buttonStyle={[styles.buttonStyle, {backgroundColor: Colors.primary}]}
      >
      </Button>
    }
  }

  constructor(props) {
    super(props)
  }

  getStatus() {
    if (this.props.isConnected) return 'connected'
    if (this.props.isConnecting) return 'connecting'
    if (this.props.device) return 'disconnected'
    return 'notConnected'
  }

  render () {
    const currentStatus = this.status[this.getStatus()]
    const vitalSigns = this.vitalSigns()
    const ninixInfo = this.ninixInfo()
    return (
      <ScrollView style={styles.container}>
        <View style={styles.banner}>
          <Banner
            type={currentStatus.type}
            title={currentStatus.title}
            subtitle={currentStatus.subtitle}
          />
          {currentStatus.button}
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.title}>Vital Signs</Text>
          { vitalSigns.map(vitalSign =>
            <ListItem
              key={vitalSign.key}
              title={vitalSign.title}
              leftIcon={vitalSign.icon}
              rightTitle={vitalSign.value}
              titleStyle={styles.listTitle}
              rightTitleStyle={styles.listTitle}
            />
          )}

          <Text style={styles.title}>Ninix Gadget</Text>
          { ninixInfo.map(vitalSign =>
            <ListItem
              key={vitalSign.key}
              title={vitalSign.title}
              leftIcon={vitalSign.icon}
              rightTitle={vitalSign.value}
              titleStyle={styles.listTitle}
              rightTitleStyle={styles.listTitle}
            />
          )}
          <ListItem
            title='Additional Info'
            leftIcon={{name: "bluetooth", type: 'material-community'}}
            titleStyle={styles.listTitle}
            chevron
            linearGradientProps={{
              colors: ['#06beb6', '#48b1bf'],
            }}
            ViewComponent={LinearGradient}
            onPress={() => this.props.navigation.navigate('Device')}
          />
        </View>
      </ScrollView>
    )
  }

  vitalSigns() {
    const { isConnected, streams } = this.props
    return [
      {
        key: 'temperature',
        title: 'Temperature',
        icon: {name: "oil-temperature", type: 'material-community'},
        value: isConnected ? `${DataDisplay.temperature(streams)}` : '-'
      },
      {
        key: 'respiratory',
        title: 'Respiratory',
        icon: {name: "weather-windy", type: 'material-community'},
        value: isConnected ? `${DataDisplay.respiratory(streams)}` : '-'
      },
      {
        key: 'orientation',
        title: 'Orientation',
        icon: {name: "google-circles", type: 'material-community'},
        value: isConnected ? `${DataDisplay.orientation(streams)}` : '-'
      },
      {
        key: 'poop_detection',
        title: 'Poop Detection',
        icon: {name: "water", type: 'material-community'},
        value: isConnected ? `${DataDisplay.humidity(streams)}` : '-'
      }
    ]
  }

  ninixInfo() {
    const { isConnected, streams } = this.props
    return [
      {
        key: 'battery',
        title: 'Battery',
        icon: {name: "battery-plus", type: 'material-community'},
        value: isConnected ? <Icon name={DataDisplay.battery(streams)} type='material-community' /> : '-'
      },
      {
        key: 'connected_at',
        title: 'Connected at',
        icon: {name: "clock", type: 'material-community'},
        value: isConnected ? this.props.connectedAt.fromNow() : '-'
      }
    ]
  }
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="view-dashboard"
      type='material-community'
      color={tintColor}
    />
  ),
}

const mapStateToProps = (state) => {
  const { data, bluetooth, device } = state
  return {
    data,
    bluetooth,
    streams: data.stream,
    isConnecting: bluetooth.isConnecting,
    isConnected: bluetooth.isConnected,
    device: device.device,
    connectedAt: bluetooth.connectedAt,
    disconnectedAt: bluetooth.disconnectedAt,
    disconnectError: bluetooth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    connect: (device) => dispatch(BluetoothAction.connect(device)),
    disconnect: () => dispatch(BluetoothAction.disconnect()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
