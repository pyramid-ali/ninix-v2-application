import React, { Component } from 'react'
import { View, DatePickerAndroid, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { parentSettings } from '../../Services/SettingInfo'
import SettingComponent from '../../Components/SettingComponent'


// Styles
import styles from '../Styles/ProfileSettingStyle'
import NavigationBar from '../../Components/NavigationBar'
import Colors from '../../Themes/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

class ProfileSetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      language: 'java'
    }
  }

  render () {
    const { navigation } = this.props
    const { type } = navigation.state.params
    const setting = parentSettings(this.getParent())

    return (
      <View style={{flex: 1}}>
        <NavigationBar style={{backgroundColor: Colors.primary}}
          leftButton={<Text style={{color: Colors.white}}><Icon name="chevron-left" /> Back</Text>}
          onPressLeftButton={this.goBack.bind(this)}
        >
          {type.toUpperCase()} Profile Settings
        </NavigationBar>
        <View style={styles.container}>
          <SettingComponent
            settings={setting}
            onChange={(settings) => {}}
          />
          <TouchableOpacity onPress={this.openDatePicker}>
            <Text>Open Date</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  async openDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(1990, 0, 1)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  goBack() {
    const { navigation } = this.props
    navigation.goBack(null)
    // TODO: send user settings to web, sync with web
  }

  getParent () {
    const { navigation, father, mother } = this.props
    const { type } = navigation.state.params
    return type === 'father' ? father : mother
  }
}

const mapStateToProps = (state) => {
  const { father, mother } = state
  return {
    father,
    mother
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetting)
