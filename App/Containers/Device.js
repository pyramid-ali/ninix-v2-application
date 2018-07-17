// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StatusBar } from 'react-native';
import { Header, Button, Badge, ListItem, Icon } from 'react-native-elements';
import _ from 'lodash';

// Dependencies
import Battery from '../Components/Battery';
import BluetoothAction from '../Redux/BluetoothRedux';

// Styles
import styles from './Styles/DeviceStyle';
import Colors from '../Themes/Colors';
import StreamListener from '../Services/StreamListener';

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battery: 0,
      fullCharge: false,
      charging: false,
      lowBattery: false,
    };
  }

  componentDidMount() {
    this.streamListener = StreamListener.subscribe(data =>
      this.setState({
        ..._.pick(data, ['battery', 'fullCharge', 'charging', 'lowBattery']),
      })
    );
    StatusBar.setBackgroundColor(Colors.primary, true);
  }

  componentWillUnmount() {
    this.streamListener.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ backgroundColor: Colors.primary }}
          backgroundColor={Colors.primary}
          centerComponent={{ text: 'DEVICE', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'search',
            color: '#fff',
            onPress: () => this.props.navigation.navigate('AddDevice'),
          }}
          leftComponent={{
            icon: 'arrow-left',
            type: 'material-community',
            color: '#fff',
            onPress: () => this.props.navigation.goBack(),
          }}
        />
        {this.renderContent()}
      </View>
    );
  }

  renderContent() {
    const { device, isConnected } = this.props;
    if (isConnected) {
      return this.renderConnected();
    }
    if (device) {
      return this.renderReconnect();
    }
    return this.renderNotConnected();
  }

  renderNotConnected() {
    return (
      <View style={styles.notConnectedContainer}>
        <Text style={styles.notConnectedTitle}>First Time Connect</Text>

        <Text style={styles.notConnectedDescription}>
          with using below button search and connect to a ninix device
        </Text>

        <Button
          buttonStyle={styles.connectButton}
          onPress={() => this.props.navigation.navigate('AddDevice')}
          icon={<Icon name="search" size={15} color="white" />}
          title="Search and Connect"
        />
      </View>
    );
  }

  renderReconnect() {
    const { name, isConnecting, error } = this.props;

    return (
      <View style={styles.notConnectedContainer}>
        <Text style={styles.notConnectedTitle}>{name || 'unknown'}</Text>
        <Badge
          value={'Disconnected'}
          textStyle={{ color: 'white' }}
          containerStyle={{ backgroundColor: 'red' }}
        />

        <Text style={styles.notConnectedDescription}>
          if you want to connect to a new device press search button at top
          right bar
        </Text>

        <Button
          buttonStyle={styles.connectButton}
          loading={isConnecting}
          loadingStyle={{ width: 100, padding: 5 }}
          disabled={isConnecting}
          onPress={this.reconnect.bind(this)}
          icon={<Icon name="refresh" size={15} color="white" />}
          title="Reconnect"
        />

        <Text style={styles.disconnectReason}>{error}</Text>
      </View>
    );
  }

  renderConnected() {
    const { revision, name, currentFirmware, latestFirmware } = this.props;
    const { battery, fullCharge, charging, lowBattery } = this.state;

    return (
      <View style={styles.connectedContainer}>
        <View style={styles.batteryContainer}>
          <Battery
            battery={battery}
            fullCharge={fullCharge}
            charging={charging}
            lowBattery={lowBattery}
          />
        </View>

        <View style={{ flex: 1 }}>
          <ListItem
            title="Status"
            leftIcon={{ name: 'check' }}
            rightTitle="Connected"
            rightTitleStyle={styles.connectedRightTitle}
          />

          <ListItem
            title="Device"
            subtitle={'Revision V' + revision}
            subtitleStyle={styles.connectedListSubtitle}
            leftIcon={{ name: 'details' }}
            rightTitle={name}
            rightTitleStyle={styles.connectedRightTitle}
          />

          <ListItem
            title="Firmware Version"
            subtitle={
              latestFirmware > currentFirmware
                ? 'Update is Available'
                : 'Latest Version'
            }
            subtitleStyle={styles.connectedListSubtitle}
            leftIcon={{ name: 'donut-large' }}
            rightTitle={'V' + currentFirmware}
            rightTitleStyle={styles.connectedRightTitle}
            onPress={() => this.props.navigation.navigate('FirmwareUpdate')}
            chevron
          />
        </View>

        <Button
          buttonStyle={styles.disconnectButton}
          onPress={this.disconnect.bind(this)}
          icon={<Icon name="bluetooth-disabled" size={15} color="white" />}
          title="Disconnect"
        />
      </View>
    );
  }

  disconnect() {
    this.props.disconnect();
  }

  reconnect() {
    this.props.reconnect();
  }
}

const mapStateToProps = state => {
  const { bluetooth, ninix, firmware } = state;
  return {
    isConnected: bluetooth.isConnected,
    isConnecting: bluetooth.isConnecting,
    error: bluetooth.error,
    device: ninix.device,
    name: ninix.name,
    revision: ninix.revision,
    currentFirmware: ninix.firmware,
    latestFirmware: firmware.version,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    disconnect: () => dispatch(BluetoothAction.disconnect()),
    reconnect: () => dispatch(BluetoothAction.reconnect()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Device);
