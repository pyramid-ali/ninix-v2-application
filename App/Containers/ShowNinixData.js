import React, { Component } from 'react'
import {ScrollView, Text, View} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ShowNinixDataStyle'
import NavigationBar from '../Components/NavigationBar'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../Components/Button'
import BluetoothAction from '../Redux/BluetoothRedux'
import CentralManager from '../Bluetooth/CentralManager'

class ShowNinixData extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { data } = this.props
    const { stream, sync } = data
    const last = stream[stream.length - 1]
    const show = last ? Object.keys(last).map((key) => {
      const value = last[key]
      if (typeof value === 'boolean') {
        return (
          <Text key={key}>{key}: {value ? 'True' : 'False' }</Text>
        )
      }
      return (
        <Text key={key}>{key}: {value}</Text>
      )

    }) : null

    const { isSyncing } = this.props.bluetooth

    return (
      <View style={{flex: 1}}>
        <NavigationBar
          style={styles.navBar}
          textStyle={styles.title}
          leftButton={this.renderLeftBarButton()}
          onPressLeftButton={() => {
            this.props.navigation.goBack(null)
            // TODO: when user tap on back
          }}
        >
          Add Device
        </NavigationBar>
        <View style={styles.container}>
          <Text>Show Realtime Data for test</Text>
          {show}
          <Button
            color='black'
            backgroundColor='white'
            disabled={isSyncing}
            onPress={() => {
              this.props.startSync()
            }}
          >
            { isSyncing ? 'Syncing...' : 'Start Synchronization' }
          </Button>

          <Button
            color='black'
            backgroundColor='white'
            onPress={() => {
              CentralManager.ninix.sendAlarmCommand().then(
                (char) => console.tron.log({log: 'command send', char})
              )
            }}
          >
            Alarm
          </Button>

        </View>

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

}

const mapStateToProps = (state) => {
  const { data, bluetooth } = state
  return {
    data,
    bluetooth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startSync: () => dispatch(BluetoothAction.startSync())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNinixData)
