// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Dependencies
import Storage from '../Realm/Storage'

// Styles
import styles from './Styles/SettingsStyle'

class Settings extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={20}
        name="cog"
        color={tintColor}
      />
    ),
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    Storage.get()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>Settings Container</Text>
      </ScrollView>
    )
  }
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
