// Libraries
import React, { Component } from 'react'
import {Text, View} from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/SignupStyle'
import EntryTemplate from '../Components/EntryTemplate'
import MobileEntrance from '../Components/MobileEntrance'
import TokenEntrance from '../Components/TokenEntrance'
import SignupAction from '../Redux/SignupRedux'
import PasswordEntrance from '../Components/PasswordEntrance'
import Router from '../Navigation/Router'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stage: 'mobile',
      mobile: '09',
      token: '',
      password: '',
      newPassword: ''
    }

    this.images = {
      mobile: require('../Images/Signup/mobile.png'),
      token: require('../Images/Signup/token.png'),
      password: require('../Images/Signup/password.png')
    }
  }

  render () {

    const { stage } = this.state
    const { error } = this.props.signup

    return (
      <EntryTemplate
        title="SIGNUP"
        imageSource={this.images[stage]}>
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
    const { requestToken, signup } = this.props

    return (
      <MobileEntrance
        onPress = {() => {
          console.tron.log('button pressed')
          requestToken(mobile, this.didMobileApproved.bind(this))
        }}
        onChangeValue = {(mobile) => this.setState({mobile})}
        value={mobile}
        fetching={signup.fetching}
        valid={RegExp(/^09\d{9}$/).test(mobile)}
      />
    )
  }

  didMobileApproved () {
    this.setState({
      stage: 'token'
    })
  }

  renderTokenEntrance () {
    const { verifyToken, signup } = this.props

    return (
      <TokenEntrance
        mobile={this.state.mobile}
        wrongNumber={() => {this.setState({stage: 'mobile'})}}
        fetching={signup.fetching}
        onFinish={(token) => {verifyToken(token, this.didTokenValidate.bind(this))}}
      />
    )
  }

  renderPasswordEntrance () {
    // TODO: handle when user want to change their password
    const { password, newPassword } = this.state

    return (
      <PasswordEntrance
        password={password}
        valid={newPassword.length > 6}
        onChangeValue={(newPassword) => this.setState({newPassword})}
        onChangePassword={() => {}}
        onAccept={() => this.props.gotoMain()}
        fetching={false}
      />
    )
  }

  didTokenValidate (password) {
    this.setState({password})
    this.setState({stage: 'password'})
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
    requestToken: (mobile, callback) => dispatch(SignupAction.requestToken(mobile, callback)),
    verifyToken: (token, callback) => dispatch(SignupAction.checkToken(token, callback)),
    gotoMain: () => dispatch(Router.navigateToMain)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
