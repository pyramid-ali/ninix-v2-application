import React, { Component } from 'react'
import { BackHandler, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Header, Button, Icon, Slider } from 'react-native-elements'
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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    this.props.leaveUpdate()
  }

  handleBackPress = () => {
    return this.props.firmware.updating
  }

  render () {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: Colors.primary}}
          backgroundColor={Colors.primary}
          leftComponent={{ icon: 'arrow-left', type: 'material-community', color: '#fff', onPress: () => this.props.firmware.updating ?  alert('please wait until update is done') : this.props.navigation.goBack() }}
          centerComponent={{ text: 'Firmware', style: { color: '#fff' } }}
        />
        <View style={styles.wrapper}>
          { this.renderContent() }
        </View>

      </View>
    )
  }

  renderContent() {
    const { isConnected, successfulUpdate,
      currentFirmware, latestFirmware, updating } = this.props

    if (successfulUpdate) {
      { this.renderSuccessfulUpdate() }
    }

    if (!isConnected && !updating) {
      { this.renderNotConnected() }
    }

    if (currentFirmware < latestFirmware) {
      { this.renderUpdatingState()}
    }

    { this.renderCheckUpdate() }
  }

  renderSuccessfulUpdate() {
    const { isConnecting, currentFirmware } = this.props
    return (
      <View>
        <Icon
          reverse
          color={Colors.secondary}
          name='check-all'
          type='material-community'
          containerStyle={{alignSelf: 'center', marginBottom: 30}}
          size={80}
        />
        <Text style={styles.text}>Firmware Updated Successfully</Text>
        <Button
          titleStyle={styles.buttonText}
          buttonStyle={styles.button}
          icon={
            <Icon
              name='check'
              size={15}
              color={Colors.dark}
            />
          }
          title={'DONE'}
          clear
          onPress={() => this.props.navigation.goBack()}
        />
        { isConnecting ?
          <Text style={styles.subtitle}>We're trying to reconnect to ninix</Text> :
          <Text style={styles.subtitle}>Current Version: V{currentFirmware}</Text>
        }
      </View>
    )
  }

  renderNotConnected() {
    return (
      <View>
        <Icon name='bluetooth-off' type='material-community' color={Colors.alert} size={30}/>
        <Text style={styles.notConnectedTitle}>Not Connected</Text>
        <Text style={styles.notConnectedText}>For updating device firmware you must connect to device</Text>
      </View>
    )
  }

  renderUpdatingState() {
    const { updating, percent, firmwareState, currentPart, partsTotal, avgSpeed, currentFirmware, latestFirmware } = this.props
    return (
      <View>
        <Icon
          reverse
          color={Colors.secondary}
          name='shape-circle-plus'
          type='material-community'
          containerStyle={{alignSelf: 'center', marginBottom: 30}}
          size={80}
        />
        <Text style={styles.text}>There is newer version of NINIX firmware</Text>
        <Button
          disabled={updating}
          disabledTitleStyle={{color: Colors.dark}}
          loadingProps={{color: Colors.dark}}
          loadingStyle={{padding: 10}}
          titleStyle={styles.buttonText}
          buttonStyle={styles.button}
          title={updating ? 'UPDATING...' : 'UPDATE NOW'}
          clear
          onPress={this.props.update.bind(this)}
        />
        {updating ?
          <View>
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Slider
                thumbStyle={{width: 0}}
                minimumTrackTintColor={Colors.secondary}
                style={{flex: 1, marginHorizontal: 10, height: 2, marginTop: 7}} step={1} minimumValue={0} maximumValue={100} value={percent} disabled />
              <Text style={{fontFamily: 'PoiretOne-Regular', width: 40}}>{percent}%</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>State: {firmwareState}</Text>
              <Text style={styles.subtitle}>Part: {currentPart}/{partsTotal}</Text>
              <Text style={styles.subtitle}>Speed: {Math.round(speed * 100) / 100} KB/S</Text>
              <Text style={styles.subtitle}>Average Speed: {Math.round(avgSpeed * 100) / 100} KB/S</Text>
            </View>
          </View>:
          <View>
            <Text style={styles.subtitle}>Current Version: V{currentFirmware}</Text>
            <Text style={styles.subtitle}>Latest Version: V{latestFirmware}</Text>
          </View>
        }

      </View>
    )
  }

  renderCheckUpdate() {
    const { currentFirmware, error } = this.props
    return (
      <View>
        <Icon
          reverse
          color={Colors.secondary}
          name='rotate-3d'
          type='material-community'
          containerStyle={{alignSelf: 'center', marginBottom: 30}}
          size={80}
        />
        <Text style={styles.text}>You're using latest firmware version</Text>
        <Button
          loading={fetch}
          loadingProps={{color: Colors.dark}}
          loadingStyle={{padding: 10}}
          titleStyle={styles.buttonText}
          buttonStyle={styles.button}
          title='CHECK FOR UPDATES'
          clear
          onPress={this.props.checkLatestVersion.bind(this)}
        />
        <Text style={styles.subtitle}>Current Version: V{currentFirmware}</Text>
        <Error message={error} />
      </View>
    )
  }
}

function Error(props) {
  if (props.message) {
    return (
      <Text style={styles.error}>{props.message}</Text>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  const { ninix, bluetooth, firmware } = state
  return {
    isConnecting: bluetooth.isConnecting,
    isConnected: bluetooth.isConnected,
    currentFirmware: ninix.firmware,
    latestFirmware: firmware.version,
    percent: firmware.percent,
    firmwareState: firmware.state,
    currentPart: firmware.currentPart,
    partsTotal: firmware.partsTotal,
    speed: firmware.speed,
    fetch: firmware.fetch,
    avgSpeed: firmware.avgSpeed,
    updating: firmware.updating,
    successfulUpdate: firmware.successfulUpdate,
    error: firmware.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLatestVersion: () => dispatch(FirmwareAction.checkLatestVersion()),
    update: () => dispatch(FirmwareAction.startUpdate()),
    leaveUpdate: () => dispatch(FirmwareAction.didLeaveUpdate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirmwareUpdate)
