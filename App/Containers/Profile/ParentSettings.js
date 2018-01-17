import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import { connect } from 'react-redux'
import { parentSettings } from '../../Services/SettingInfo'
import SettingComponent from '../../Components/SettingComponent'
import ParentAction from '../../Redux/ParentRedux'


// Styles
import styles from '../Styles/ProfileSettingStyle'
import NavigationBar from '../../Components/NavigationBar'
import Colors from '../../Themes/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import ModalDeviceConnect from '../../Components/ModalDeviceConnect';

class ParentSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      syncing: false,
    }
    this.information = this.getParent()
  }

  render () {
    const { navigation } = this.props
    const { type } = navigation.state.params
    const setting = parentSettings(this.getParent())

    return (
      <View style={{flex: 1}}>
        <NavigationBar style={{backgroundColor: Colors.primary}}
          leftButton={<Text style={{color: Colors.white}}><Icon name="chevron-left" size={18} /></Text>}
          rightButton={<Text style={{color: Colors.white}}><Icon name="check" size={18} /></Text>}
          onPressLeftButton={this.cancel.bind(this)}
          onPressRightButton={this.save.bind(this)}
        >
          {type.toUpperCase()}
        </NavigationBar>
        <View style={styles.container}>
          <SettingComponent
            settings={setting}
            onChange={this.onChangeSetting.bind(this)}
          />
        </View>
        <ModalDeviceConnect
          visible={this.state.syncing}
          children={<Text>Saving data, please wait ...</Text>}
          title='syncing data'
          onRequestClose={() => {}}
        />
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

      this.updateParentSetting(payload)
    }
  }

  cancel () {
    this.setState({
      syncing: false
    })
    const parent = this.getParent()
    if (parent.sync) {
      this.goBack()
    }
    else {
      Alert.alert(
        'Unsaved Data',
        'You have changed some settings, do you want to leave?',
        [
          {text: 'leave', onPress: this.goBack.bind(this)},
          {text: 'stay', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
  }

  goBack() {
    const { navigation } = this.props
    const { type } = navigation.state.params
    if (type === 'father') {
      this.props.resetFatherInformation(this.information)
    }
    else if (type === 'mother') {
      this.props.resetMotherInformation(this.information)
    }
    navigation.goBack(null)
  }

  save () {
    const { type } = this.props.navigation.state.params
    this.startSync()
    if (type === 'father') {
      this.props.saveFatherInformation(this.onSuccess.bind(this), this.onFailure.bind(this))
    }
    else if (type === 'mother') {
      this.props.saveMotherInformation(this.onSuccess.bind(this), this.onFailure.bind(this))
    }
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
    }
    else if (type === 'mother') {
      this.props.updateMother(payload)
    }
  }

  startSync () {
    this.setState({
      syncing: true
    })
  }

  stopSync () {
    this.setState({
      syncing: false
    })
  }

  onSuccess (success) {
    this.stopSync()
    this.goBack()
    console.log(success, 'success parent settings')
  }

  onFailure (error) {
    this.stopSync()
    alert(error.message || error.problem)
    console.log(error, 'failure parent settings')
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
    updateMother: (payload) => dispatch(ParentAction.changeMotherInformation(payload)),
    updateFather: (payload) => dispatch(ParentAction.changeFatherInformation(payload)),
    saveMotherInformation: (onSuccess, onFailure) => dispatch(ParentAction.saveMotherInformation(onSuccess, onFailure)),
    saveFatherInformation: (onSuccess, onFailure) => dispatch(ParentAction.saveFatherInformation(onSuccess, onFailure)),
    resetMotherInformation: (old) => dispatch(ParentAction.setMotherInformation(old)),
    resetFatherInformation: (old) => dispatch(ParentAction.setFatherInformation(old)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentSettings)
