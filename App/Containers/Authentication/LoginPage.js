// Libraries
import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationActions } from 'react-navigation'

// Components
import TextInputWithIcon from '../../Components/TextInputWithIcon'
import Button from '../../Components/Button'

// Redux
import Signup from '../../Redux/SignupRedux'
import Login from '../../Redux/LoginRedux'

// Styles
import styles from '../Styles/LoginPageStyle'
import { Colors } from '../../Themes/index'


class LoginPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      keyboardOpen: false,
      mobile: '',
      password: '',
    }

    /***
     * gradient setting for rendering gradient background on background image
     * @type {{start: {x: number, y: number}, end: {x: number, y: number}, colors: [string,string,string], locations: [number,number,number]}}
     */
    this.gradient = {
      start: {
        x: 0,  y: 0.9
      },
      end: {
        x: 1,  y: 0.1
      },
      colors: [
        'rgba(0, 0, 0, 0.9)',
        'rgba(27, 163, 156, 0.6)',
        'rgba(255, 255, 255, 0.4)'
      ],
      locations: [
        0, 0.6, 0.85
      ]
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    this.setState({
      keyboardOpen: true
    })
  }

  _keyboardDidHide () {
    this.setState({
      keyboardOpen: false
    })
  }

  render () {

    const { mobile, password } = this.state
    const { login } = this.props
    const { navigate } = this.props.navigation

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../../Images/login-background.jpg')}>
          <LinearGradient
            {...this.gradient}
            style={styles.gradientBackground}>
            {this.state.keyboardOpen ? null : <View style={styles.logoContainer}>
            <Text style={styles.logo}>
              NiNiX
            </Text>
            </View>}

            <View style={styles.formContainer}>
              {this.showError()}

              <TextInputWithIcon
                editable={!login.fetching}
                keyboardType="phone-pad"
                maxLength={11}
                containerStyle={styles.textInputContainerStyle}
                style={styles.textInput}
                size={20}
                icon='mobile'
                color="white"
                placeholderTextColor='white'
                onChangeText={(mobile) => this.setState({mobile})}
                value={mobile}
              placeholder='Mobile Number' />
              <TextInputWithIcon
                editable={!login.fetching}
                containerStyle={styles.textInputContainerStyle}
                style={styles.textInput}
                size={20}
                icon='unlock-alt'
                color="white"
                placeholderTextColor='white'
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                value={password}
                placeholder='Password' />

              {this.showActivityIndicator()}

              <Text
                style={styles.linkContainer}>
                Forgot Your Login Details?
                <Text
                  onPress={() => alert('forgot password')}
                  style={styles.link}> Retrieve Now</Text>
              </Text>
              <Text
                onPress={() => {
                  navigate('MobileEntry')
                }}
                style={styles.footerText}>Signup</Text>

            </View>
          </LinearGradient>
        </Image>
      </KeyboardAvoidingView>
    )
  }

  /***
   * check input validity to enable login button
   * @returns {boolean}
   */
  verification () {
    const {accessAbility} = this.props
    const {mobile, password} = this.state
    const regex = new RegExp(/^09\d{9}$/)
    return regex.test(mobile) && password.length > 0 // TODO: && accessAbility.isConnected
  }

  /***
   * show error received from server or other problems
   * @returns {*}
   */
  showError () {
    const { login } = this.props
    return (
      login.error ?
      <Text style={styles.error}>
        {login.error}
      </Text> : null
    )
  }

  /***
   * if a request is in progress show activity indicator to user else show login button
   * @returns {XML}
   */
  showActivityIndicator () {
    const { login, loginRequest } = this.props
    const { mobile, password } = this.state
    return (
      login.fetching ?
      <ActivityIndicator/> :
      <Button
          disabled={!this.verification()}
          containerStyle={styles.buttonStyle}
          color={Colors.white}
          backgroundColor={Colors.primary}
          onPress={() => {
            loginRequest(mobile, password, this.onSuccess.bind(this))
            Keyboard.dismiss()
          }}
        >
          Login
        </Button>
    )
  }

  onSuccess () {
    const navigationAction =  NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    })
    this.props.resetTo(navigationAction)
  }

}

const mapStateToProps = (state) => {
  const { login, accessAbility } = state
  return {
    login,
    accessAbility
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (navigation) => dispatch(Signup.start(navigation)),
    loginRequest: (mobile, password, callback) => dispatch(Login.request(mobile, password, callback)),
    resetTo: (action) => dispatch(action)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

// TODO: give activity indicator some vertical padding
