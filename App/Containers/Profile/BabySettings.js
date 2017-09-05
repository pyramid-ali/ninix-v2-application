import React, { Component } from 'react'
import {ScrollView, Text, View} from 'react-native'
import { connect } from 'react-redux'
import { babySettings } from '../../Services/SettingInfo'
import BabyAction from '../../Redux/BabyRedux'

// Styles
import styles from '../Styles/BabySettingsStyle'
import Colors from '../../Themes/Colors'
import SettingComponent from '../../Components/SettingComponent'
import NavigationBar from '../../Components/NavigationBar'
import Icon from 'react-native-vector-icons/FontAwesome'

class BabySettings extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { baby } = this.props
    const settings = babySettings(baby)
    return (
      <View style={{flex: 1}}>
        <NavigationBar style={{backgroundColor: Colors.primary}}
                       leftButton={<Text style={{color: Colors.white}}><Icon name="chevron-left" /> Back</Text>}
                       onPressLeftButton={this.goBack.bind(this)}
        >
          Baby Settings
        </NavigationBar>
        <View style={styles.container}>
          <SettingComponent
            settings={settings}
            onChange={this.onChangeSetting.bind(this)}
          />
        </View>
      </View>
    )
  }

  goBack () {
    const { navigation } = this.props
    navigation.goBack(null)
    // TODO: send user settings to web, sync with web
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
    this.props.update(payload)
  }
}

const mapStateToProps = (state) => {
  const { baby } = state
  return {
    baby
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (payload) => dispatch(BabyAction.update(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BabySettings)
