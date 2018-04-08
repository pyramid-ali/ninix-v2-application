// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header, ListItem } from 'react-native-elements'

// Dependencies
import AppAction from '../Redux/AppRedux'

// Styles
import styles from './Styles/SettingsStyle'
import Colors from '../Themes/Colors'
import CentralManager from '../Bluetooth/CentralManager';


// TODO: we must have following options here
// 1. Logout functionality should be placed here
class Settings extends Component {

  render () {

    const list = [
      {
        title: 'Appointments',
        icon: 'av-timer'
      },
      {
        title: 'Trips',
        icon: 'flight-takeoff'
      },
      {
        title: 'Trips',
        icon: 'search'
      }
    ]

    const profileSettings = [
      {
        title: 'Father',
        icon: 'av-timer'
      },
      {
        title: 'Mother',
        icon: 'av-timer'
      },
      {
        title: 'baby',
        icon: 'av-timer'
      },
    ]

    return (
      <ScrollView style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: Colors.primary}}
          backgroundColor={Colors.primary}
          centerComponent={{ text: 'SETTINGS', style: { color: '#fff' } }}
        />
        <View style={styles.list}>
          <Text style={styles.listTitle}>
            General
          </Text>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
                chevron
              />
            ))
          }
        </View>

        <View style={styles.list}>
          <Text style={styles.listTitle}>
            App
          </Text>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
                chevron
              />
            ))
          }
        </View>

        <View style={styles.list}>
          <Text style={styles.listTitle}>
            Information
          </Text>
          {
            profileSettings.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
                chevron
              />
            ))
          }
        </View>

        <View>

          <ListItem
            title='Logout'
            scaleProps={{
              friction: 90,
              tension: 100,
              activeScale: 0.95,
            }}
            containerStyle={{backgroundColor: 'red'}}
            leftIcon={{name: 'cancel', color: 'white'}}
            titleStyle={{color: 'white'}}
            onPress={() => this.props.logout()}
          />

        </View>

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

    logout: () => dispatch(AppAction.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
