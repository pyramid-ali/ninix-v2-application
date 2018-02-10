// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from './Styles/SettingsStyle'

// TODO: we must have following options here
// 1. Logout functionality should be placed here
class Settings extends Component {

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>Settings Container</Text>
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
