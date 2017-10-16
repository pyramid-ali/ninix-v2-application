import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import EntryTemplate from './EntryTemplate'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../Styles/MobileEntryStyle'
import TextInputWithIcon from '../../../Components/TextInputWithIcon'
import Colors from '../../../Themes/Colors'
import Button from '../../../Components/Button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Signup from '../../../Redux/SignupRedux'

class MobileEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: ''
    }
  }

  render () {
    const { signup } = this.props
    const { mobile } = this.state

    return (
      <EntryTemplate
        title="Signup"
        leftBarButton={this.leftBarButton()}
        imageSource={require('../../../Images/Signup/4-3.png')}>
        <View style={styles.form}>
          {signup.error ?
            <Text style={styles.error}>
              {signup.error}
            </Text> :
            null
          }
          <Text style={styles.description}>
            Enter Your Mobile for Receiving activation code
          </Text>
          <TextInputWithIcon
            icon="mobile"
            ref="mobileInput"
            size={20}
            selectionColor={Colors.dark}
            color={Colors.dark}
            value={mobile}
            editable={!signup.fetching}
            onFocus={() => this.setState({ mobile: '09' })}
            onChangeText={(mobile) => this.setState({ mobile })}
            placeholder='Enter your mobile'/>
          {signup.fetching ? <ActivityIndicator size={24} /> : this.renderActivateButton() }
        </View>
      </EntryTemplate>
    )
  }

  renderActivateButton() {
    const { requestToken } = this.props
    const { mobile } = this.state
    const { mobileInput } = this.refs
    const active = new RegExp(/^09\d{9}$/).test(mobile)

    return (
      <Button
        disabled={!active}
        color={Colors.white}
        backgroundColor={Colors.dark}
        onPress={() => {
          requestToken(mobile, this.onSuccess.bind(this))
          mobileInput.blur()
        }}>
        Activate
      </Button>
    )

  }

  leftBarButton() {

    const { cancel, navigation } = this.props
    const { goBack } = navigation

    return (
      <TouchableOpacity
        style={{zIndex: 9999}}
        onPress={() => {
          cancel()
          goBack(null)
        }}>
        <Icon name="chevron-left" size={22} color="white" />
      </TouchableOpacity>
    )
  }

  onSuccess () {
    console.log('on success mobile entry callback')
    const { navigate } = this.props.navigation
    navigate('ActivationCode')
  }
}

const mapStateToProps = (state) => {
  const { signup } = state
  return {
    signup
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancel: () => dispatch(Signup.cancel()),
    requestToken: (mobile, callback) => dispatch(Signup.requestToken(mobile, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileEntry)
