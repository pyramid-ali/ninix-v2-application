import React, { Component } from 'react'
import { View, DatePickerAndroid, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { parentSettings } from '../../Services/SettingInfo'
import SettingComponent from '../../Components/SettingComponent'
import ParentAction from '../../Redux/ParentRedux'


// Styles
import styles from '../Styles/ProfileSettingStyle'
import NavigationBar from '../../Components/NavigationBar'
import Colors from '../../Themes/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

class ProfileSetting extends Component {
  constructor (props) {
    super(props)
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
            onChange={this.onChangeSetting.bind(this)}
          />
        </View>
      </View>
    )
  }

  onChangeSetting (settings) {
    let payload = {}
    if(Array.isArray(settings)) {
      settings.forEach((item, index) => {
        payload = {
          ...payload,
          [item.key]: item.value
        }
      })
    }

    this.updateParentSetting(payload)
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

  updateParentSetting (payload) {
    const { type } = this.props.navigation.state.params
    if (type === 'father') {
      this.props.updateFather(payload)
      // TODO: sent settings to server
    }
    else if (type === 'mother') {
      this.props.updateMother(payload)
    }
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
    updateMother: (payload) => dispatch(ParentAction.updateMother(payload)),
    updateFather: (payload) => dispatch(ParentAction.updateFather(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetting)
