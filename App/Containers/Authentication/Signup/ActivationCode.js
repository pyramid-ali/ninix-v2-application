import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from '../../Styles/ActivationCodeStyle'
import TextInputWithIcon from '../../../Components/TextInputWithIcon'
import Colors from '../../../Themes/Colors'
import EntryTemplate from './EntryTemplate'
import Config from 'react-native-config'
import Icon from 'react-native-vector-icons/FontAwesome'
import CharacterInputSerie from '../../../Components/CharacterInputSerie'
import Signup from '../../../Redux/SignupRedux'

class ActivationCode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timer: Config.SMS_REVOKE_TIME
    }
  }

  componentDidMount() {
    this.revokeTimer()
  }

  revokeTimer() {
    this.setState({
      timer: Config.SMS_REVOKE_TIME
    })
    this.timer =  setInterval(() => {
      const { timer } = this.state
      if(timer === 0) {
        clearInterval(this.timer)
        return
      }
      this.setState({
        timer: timer - 1
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  renderTimer() {
    const { timer } = this.state
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return `${minutes > 10 ? minutes : '0' + minutes}: ${seconds > 10 ? seconds : '0' + seconds}`
  }

  render () {
    const { timer } = this.state
    const { signup, checkActivationCode } = this.props
    const disabled = timer === 0 || signup.checkingActivationCode
    return (
      <EntryTemplate
        title="Activation"
        imageSource={require('../../../Images/Signup/4-2.png')}>
        <View style={styles.form}>
          {signup.error ?
            <Text style={styles.error}>
              {signup.error}
            </Text> :
            null
          }
          {
            timer === 0 ?
              <Text style={styles.error}>
                Your Token has been expired
              </Text>
              :
              <Text style={styles.timerContainerText}>
                Revoke Time: {this.renderTimer()}
              </Text>
          }
          <Text style={styles.description}>
            Enter the activation code that has been sent to { signup.mobile }:
          </Text>

          <CharacterInputSerie
            disabled={disabled}
            containerStyle={styles.input}
            onFinish={(code) => {
              checkActivationCode(signup.mobile, code, this.props.navigation)
            }}
            size={4} />
          {signup.isCheckingActivationCode ? <ActivityIndicator /> : null}
          {this.renderFooter()}

        </View>
      </EntryTemplate>
    )
  }

  leftBarButton() {
    return (
      <TouchableOpacity
        style={{zIndex: 9999}}
        onPress={this.props.back}>
        <Icon name="chevron-left" size={22} color="white" />
      </TouchableOpacity>
    )
  }

  renderFooter() {
    const { timer } = this.state
    const { wrongNumber, signup, navigation } = this.props
    return (
      <View
        style={styles.footer}>
        <TouchableOpacity
          disabled={timer !== 0}
          onPress={() => this.renderAlert()}>
          <Text
            style={[styles.link, timer !== 0 ? styles.disableLink : null]}>
            Resend Code?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={signup.isCheckingActivationCode}
          onPress={() => wrongNumber(navigation)}>
          <Text style={[styles.link, signup.isCheckingActivationCode ? styles.disableLink : null]}>
            Wrong Number
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderAlert() {
    return Alert.alert(
      'Resend Activation Code',
      'Ok, That\'s fine. We send another activation code for you. but remember you could try request only 5 times in a day',
      [
        {text: 'Ok, I Understand', onPress: () => {
          this.revokeTimer()
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
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
    checkActivationCode: (mobile, code, navigation) => dispatch(Signup.checkingActivationCode(mobile, code, navigation)),
    wrongNumber: (navigation) => dispatch(Signup.wrongNumber(navigation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivationCode)
