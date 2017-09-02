import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../../Components/NavigationBar'
import moment from 'moment'

// Styles
import styles from '../Styles/DeviceStyle'
import DeviceLogItem from '../../Components/DeviceLogItem'


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

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {

    const data = [
      {
        key: 1,
        status: 'Disconnected',
        date: moment().subtract(10, 'm')
      },
      {
        key: 2,
        status: 'Connected',
        date: moment().subtract(100, 'm')
      },
      {
        key: 3,
        status: 'Disconnected',
        date: moment().subtract(1000, 'm')
      },
      {
        key: 4,
        status: 'Connected',
        date: moment().subtract(1000, 'm')
      }
    ]

    const { bluetooth } = this.props
    const { battery, isConnected } = bluetooth

    return (
      <View style={styles.wrapper}>
        <NavigationBar
          rightButton={this.renderRightBarButton()}
          onPressRightButton={this.pressRightBarButton.bind(this)}
          style={styles.navBar}
        >
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
              <Text style={styles.firmwareText}>Firmware Version <Text>v1.0.4</Text></Text>
              <Text style={styles.firmwareButton}>Check for updates</Text>
            </View>
          </View>
          <View style={styles.logContainer}>
            <FlatList
              data={data}
              renderItem={({item}) => this.renderItem(item)}
              ItemSeparatorComponent={this.renderDivider}
            />
          </View>
        </ScrollView>
      </View>

    )
  }

  renderItem (item) {
    return (
      <DeviceLogItem status={item.status} date={item.date} />
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
  const { bluetooth } = state
  return {
    bluetooth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device)
