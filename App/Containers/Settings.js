// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from './Styles/SettingsStyle'
import Button from '../Components/Button';
import Storage from '../Realm/Storage';
import CentralManager from '../Bluetooth/CentralManager';

// TODO: we must have following options here
// 1. Logout functionality should be placed here
class Settings extends Component {

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>Settings</Text>
        <Button onPress={() => {
          Storage.getTemp()
        }}>
          get Temp
        </Button>
        <Button onPress={() => {
          Storage.get()
        }}>
          get all data
        </Button>
        <Button onPress={() => {
          CentralManager.ninix.getName().then((char) => console.tron.log(char))
        }}>
          get name
        </Button>
        <Button onPress={() => {
          CentralManager.ninix.getHardwareRevision().then((char) => console.tron.log(char))
        }}>
          get revision
        </Button>
        <Button onPress={() => {
          const timestamp = Date.now() / 1000
          const buffer = Buffer.alloc(5, 0x06)
          console.tron.log({log: 'before time', buffer})
          buffer.writeUInt32LE(timestamp, 1)
          console.tron.log({log: 'after time', buffer})
          const data = buffer.toString('Base64')
          console.tron.log({log: 'before time', data})
        }}>
          buffer
        </Button>
      </ScrollView>
    )
  }
}

// set navigation option
Settings.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="cog"
      color={tintColor}
    />
  ),
}


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
