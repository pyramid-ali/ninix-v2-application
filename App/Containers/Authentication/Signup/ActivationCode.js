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


  render () {
    const { timer } = this.state
    const { signup, checkActivationCode } = this.props
    const disabled = timer === 0 || signup.fetching
    return (
      <EntryTemplate
        title="Activation"
        imageSource={require('../../../Images/Signup/4-2.png')}>
        <View style={styles.form}>
          {this.renderError()}
          {this.renderTimer()}
          <Text style={styles.description}>
            Enter the activation code that has been sent to { signup.mobile }:
          </Text>

          <CharacterInputSerie
            disabled={disabled}
            containerStyle={styles.input}
            onFinish={(code) => {
              checkActivationCode(code, this.onSuccess.bind(this), this.onFailure.bind(this))
            }}
            size={4} />
          {signup.fetching ? <ActivityIndicator /> : null}
          {this.renderFooter()}

        </View>
      </EntryTemplate>
    )
  }

  /***
   * Display Timer, convert seconds to a clock watch
   * @returns {string}
   * @constructor
   */
  DisplayTimer() {
    const { timer } = this.state
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return `${minutes > 10 ? minutes : '0' + minutes}: ${seconds > 10 ? seconds : '0' + seconds}`
  }

  /***
   * if any error occurred during check activation code, this block of function shows it in a proper way
   * @returns {*}
   */
  renderError () {
    const { signup } = this.props
    return (
      signup.error ?
      <Text style={styles.error}>
        {signup.error}
      </Text>
        :
      null
    )
  }

  /***
   * with help of displayTimer this function render times to expiration of activation code
   * @returns {XML}
   */
  renderTimer () {
    const { timer } = this.state
    return (
      timer === 0 ?
      <Text style={styles.error}>
        Your Token has been expired
      </Text>
        :
      <Text style={styles.timerContainerText}>
        Revoke Time: {this.DisplayTimer()}
      </Text>
    )
  }

  /***
   * render footer, show control buttons for wrong number, or resend activation code
   * @returns {XML}
   */
  renderFooter () {
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
          disabled={signup.fetching}
          onPress={() => wrongNumber(navigation)}>
          <Text style={[styles.link, signup.fetching ? styles.disableLink : null]}>
            Wrong Number
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  /***
   * render alert
   */
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

  /***
   * this callback used for navigating when activation code was successful
   */
  onSuccess (password: string) {
    console.log('onSuccess Activation code', password)
    const { navigate } = this.props.navigation
    navigate('PasswordEntry', {password})
  }

  onFailure (error: string) {

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
    checkActivationCode: (code, callback, failure) => dispatch(Signup.checkToken(code, callback, failure)),
    wrongNumber: (navigation) => dispatch(Signup.wrongNumber(navigation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivationCode)

// TODO: we can send digits of activation code to application, therefore when we change activation code length we don't need to update app
