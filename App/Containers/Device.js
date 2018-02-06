// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View, FlatList, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Dependencies
import DeviceAction from '../Redux/DeviceRedux'
import DeviceLogItem from '../Components/DeviceLogItem'
import NavigationBar from '../Components/NavigationBar'
import Realm from '../Realm/Storage'

// Styles
import styles from './Styles/DeviceStyle'

class Device extends Component {
  static navigationOptions = {
    tabBarLabel: 'Device',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={20}
        name="podcast"
        color={tintColor}
      />
    ),
  }

  _keyExtractor = (item, index) => index;

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.pullDeviceLogs()
    Realm.get()
  }

  render () {

    const { logs, localFirmwareVersion, fetching } = this.props.device
    const { isConnected } = this.props.bluetooth
    const { battery } = this.props.ninix

    return (
      <View style={styles.wrapper}>
        <NavigationBar
          rightButton={this.renderRightBarButton()}
          onPressRightButton={this.pressRightBarButton.bind(this)}
          style={styles.navBar}>
          Device
        </NavigationBar>
        <ScrollView style={styles.container}>
          <View style={styles.deviceContainer}>
            <View style={styles.deviceShapeContainer}>
              <View style={styles.deviceShape}>
                <Text style={styles.batteryCharge}> { Number.isInteger(battery) ? battery + '%' : 'Unknown'}</Text>
                <Text style={styles.batteryChargeFooter}>{ isConnected ? 'Battery Charge' : 'No Device Connected'}</Text>
              </View>
              <View style={styles.deviceShapeHead}/>
            </View>
            <View style={styles.firmwareDetails}>
              <Text style={styles.firmwareText}>Firmware Version <Text>{ localFirmwareVersion || 'N/A' }</Text></Text>
              <Text style={styles.firmwareButton}>Check for updates</Text>
            </View>
          </View>
          <View style={styles.logHeaderContainer}>
            <Text style={styles.logHeader}>Connection History</Text>
            <ActivityIndicator style={styles.logActivityIndicator} size="small" color="#000" animating={fetching} />
          </View>
          <View style={styles.logContainer}>
            <FlatList
              data={logs}
              keyExtractor={this._keyExtractor}
              renderItem={(row) => this.renderItem(row)}
              ItemSeparatorComponent={this.renderDivider}
            />
          </View>
        </ScrollView>
      </View>

    )
  }

  renderItem (row) {
    const { item } = row
    return (
      <DeviceLogItem status={item.status} date={item.created_at} />
    )
  }

  renderRightBarButton () {
    return (
      <Text style={styles.rightBarButton}>
        ADD <Icon name="plus" size={14} color="white"/>
      </Text>
    )
  }

  pressRightBarButton () {
    const { navigation } = this.props
    navigation.navigate('AddDevice')
  }

  renderDivider () {
    return (
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <View style={styles.dividerCenter} />
        <View style={styles.dividerLine} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { bluetooth, ninix, device } = state
  return {
    bluetooth, ninix, device
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pullDeviceLogs: () => dispatch(DeviceAction.pullDeviceLogs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device)
