import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, TouchableOpacity, Alert} from 'react-native'
import styles from './Styles/TokenEntranceStyle'
import CharacterInputSerie from './CharacterInputSerie'

export default class TokenEntrance extends Component {

  constructor (props) {
    super(props)
    this.state = {
      timer: 120
    }
  }

  // Prop type warnings
  static propTypes = {
    mobile: PropTypes.string.isRequired,
  }

  // Defaults for props
  static defaultProps = {
    fetching: false,
    onFinish: () => {},
    wrongNumber: () => {},
    resendCode: () => {}
  }

  componentDidMount() {
    this.revokeTimer()
  }

  revokeTimer() {
    this.setState({
      timer: 120
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

    const { mobile, fetching, onFinish } = this.props

    return (
      <View>

        <Text style={styles.title}>
          Verification
        </Text>

        <Text style={styles.description}>
          we've sent verification code to: { mobile }
        </Text>

        <CharacterInputSerie
          disabled={false}
          containerStyle={styles.input}
          onFinish={onFinish}
          size={4} />
        <ActivityIndicator animating={fetching} />
        { this.renderFooter() }

      </View>
    )
  }

  DisplayTimer() {
    const { timer } = this.state
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return `${minutes > 10 ? minutes : '0' + minutes}: ${seconds > 10 ? seconds : '0' + seconds}`
  }

  renderFooter () {
    const { timer } = this.state
    const { wrongNumber, fetching } = this.props
    return (
      <View
        style={styles.footer}>
        <TouchableOpacity
          disabled={timer !== 0 || fetching}
          onPress={() => this.renderAlert()}>
          <Text
            style={[styles.link, timer !== 0 ? styles.disableLink : null]}>
            Resend Code? {this.DisplayTimer()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={fetching}
          onPress={wrongNumber}>
          <Text style={[styles.link, fetching ? styles.disableLink : null]}>
            Wrong Number
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderAlert() {
    const { resendCode } = this.props
    return Alert.alert(
      'Resend Activation Code',
      'Ok, That\'s fine. We send another activation code for you. but remember you could try request only 5 times in a day',
      [
        {text: 'Ok, I Understand', onPress: () => {
          this.revokeTimer()
          resendCode()
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

}
