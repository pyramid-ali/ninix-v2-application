// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, ListItem } from 'react-native-elements';

// Dependencies
import AppAction from '../Redux/AppRedux';

// Styles
import styles from './Styles/SettingsStyle';
import Colors from '../Themes/Colors';
import CentralManager from '../Bluetooth/CentralManager';

// TODO: we must have following options here
// 1. Logout functionality should be placed here
class Settings extends Component {
  render() {
    const Settings = [
      {
        title: 'Change Password',
        leftIcon: { name: 'key-variant', type: 'material-community' },
        onPress: () => this.props.navigation.navigate('ChangePassword'),
      },
      {
        title: 'Privacy and Policy',
        leftIcon: { name: 'book-open', type: 'material-community' },
        onPress: () => this.props.navigation.navigate('PrivacyPolicy'),
      },
      {
        title: 'Ninix',
        leftIcon: { name: 'info' },
        subtitle: 'V2.0.0',
        rightTitle: '2017-06-24',
      },
      {
        title: 'Logout',
        leftIcon: { name: 'logout', type: 'material-community' },
        onPress: () => {
          Alert.alert('Logout', 'Are you sure you want to logout from app?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: this.props.logout.bind(this) },
          ]);
        },
      },
    ];

    const device = [
      {
        title: 'Reset Device',
        leftIcon: { name: 'refresh', type: 'material-community' },
        onPress: () => {
          if (this.props.isConnected) {
            Alert.alert(
              'Reset Device',
              'Are you sure you want to Reset Device?' +
                '\n' +
                'with this action you hard reset ninix device, and all data stored in device will lost',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'OK',
                  onPress: CentralManager.ninix.reset(() => {
                    Alert.alert('Success', 'device did reset successfully', [
                      { text: 'OK' },
                    ]);
                  }),
                },
              ]
            );
          } else {
            Alert.alert(
              'No Device Connected',
              'For resetting device you should connect to a device first',
              [{ text: 'OK' }]
            );
          }
        },
      },
      {
        title: 'Turn off Device',
        leftIcon: { name: 'bluetooth-off', type: 'material-community' },
        onPress: () => {
          if (this.props.isConnected) {
            Alert.alert(
              'Turn Off Device',
              'Are you sure you want to Turn Off Device?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'OK',
                  onPress: CentralManager.ninix.turnOff().then(() => {
                    Alert.alert('Success', 'device turned off successfully', [
                      { text: 'OK' },
                    ]);
                  }),
                },
              ]
            );
          } else {
            Alert.alert(
              'No Device Connected',
              'there is no device connected to application',
              [{ text: 'OK' }]
            );
          }
        },
      },
    ];

    return (
      <ScrollView style={styles.container}>
        <Header
          statusBarProps={{ backgroundColor: Colors.primary }}
          backgroundColor={Colors.primary}
          leftComponent={{
            icon: 'arrow-left',
            type: 'material-community',
            color: '#fff',
            onPress: () => this.props.navigation.goBack(),
          }}
          centerComponent={{ text: 'SETTINGS', style: { color: '#fff' } }}
        />
        <View style={styles.list}>
          <Text style={styles.listTitle}>General</Text>
          {Settings.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              rightTitle={item.rightTitle}
              rightTitleStyle={{ fontSize: 12 }}
              leftIcon={item.leftIcon}
              onPress={item.onPress}
              chevron
            />
          ))}
        </View>

        <View style={styles.list}>
          <Text style={styles.listTitle}>Device</Text>
          {device.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              rightTitle={item.rightTitle}
              rightTitleStyle={{ fontSize: 12 }}
              leftIcon={item.leftIcon}
              onPress={item.onPress}
              chevron
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

// set navigation option
Settings.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor }) => (
    <Icon size={20} name="cog" color={tintColor} />
  ),
};

const mapStateToProps = state => {
  const { bluetooth } = state;
  return {
    isConnected: bluetooth.isConnected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(AppAction.logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
