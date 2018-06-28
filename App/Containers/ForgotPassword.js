// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

// Dependencies
import EntryTemplate from '../Components/EntryTemplate'
import MobileEntrance from '../Components/MobileEntrance'
import TokenEntrance from '../Components/TokenEntrance'
import ForgotPasswordAction from '../Redux/ForgotPasswordRedux'
import PasswordEntrance from '../Components/PasswordEntrance'

// Styles
import styles from './Styles/ForgotPasswordStyle'

class ForgotPassword extends Component {

  constructor (props) {
    super(props)
    this.state = {
      stage: 'mobile',
      mobile: '',
      token: '',
      password: ''
    }

    this.images = {
      mobile: require('../Images/Signup/mobile.png'),
      token: require('../Images/Signup/token.png'),
      password: require('../Images/Signup/password.png')
    }
  }

  componentWillUnmount() {
    this.props.cancel()
  }

  render () {

    const { stage } = this.state
    const { error } = this.props.forgotPassword

    return (
      <EntryTemplate
        title="Forgot Password"
        imageSource={this.images[stage]}
        onPressCancel={() => {
          this.resetState()
          this.props.navigation.goBack()
        }}
      >
        <View style={styles.formContainer}>
          { error ? <Text style={styles.error}>{ error }</Text> : null }
          { stage === 'mobile' ? this.renderMobileEntrance() : null }
          { stage === 'token' ? this.renderTokenEntrance() : null }
          { stage === 'password' ? this.renderPasswordEntrance() : null }
        </View>
      </EntryTemplate>
    )
  }

  renderMobileEntrance () {
    const { mobile } = this.state
    const { requestToken, forgotPassword } = this.props

    return (
      <MobileEntrance
        onPress = {() => {
          requestToken(mobile, this.didMobileApproved.bind(this))
        }}
        onChangeValue = {(mobile) => this.setState({mobile})}
        value={mobile}
        fetching={forgotPassword.fetching}
        valid={RegExp(/^09\d{9}$/).test(mobile)}
      />
    )
  }

  renderTokenEntrance () {
    const { verifyToken, forgotPassword } = this.props

    return (
      <TokenEntrance
        mobile={this.state.mobile}
        wrongNumber={() => {this.setState({stage: 'mobile'})}}
        fetching={forgotPassword.fetching}
        onFinish={(token) => {verifyToken(this.state.mobile, token, this.didTokenValidate.bind(this))}}
      />
    )
  }

  renderPasswordEntrance () {
    const { mobile, token, password } = this.state

    return (
      <PasswordEntrance
        title='New Password'
        valid={password.length >= 6}
        value={password}
        placeholder='Enter New Password'
        onChangeValue={(password) => this.setState({password})}
        onPress={() => this.props.register(mobile, token, password)}
        fetching={this.props.forgotPassword.fetching}
      />
    )
  }

  didMobileApproved (mobile) {
    this.setState({
      mobile,
      stage: 'token'
    })
  }

  didTokenValidate (mobile, token) {
    this.setState({
      mobile,
      token,
      stage: 'password'
    })
  }

  resetState () {
    this.setState({
      stage: 'mobile',
      mobile: '09',
      token: '',
      password: ''
    })
  }

}

const mapStateToProps = (state) => {
  const { forgotPassword } = state
  return {
    forgotPassword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestToken: (mobile, callback) => dispatch(ForgotPasswordAction.requestToken(mobile, callback)),
    verifyToken: (mobile, token, callback) => dispatch(ForgotPasswordAction.checkToken(mobile, token, callback)),
    changePassword: (mobile, token, password) => dispatch(ForgotPasswordAction.changePassword(mobile, token, password)),
    cancel: () => dispatch(ForgotPasswordAction.cancel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
