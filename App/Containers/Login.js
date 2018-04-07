// Libraries
import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, Keyboard, ActivityIndicator, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

// Dependencies
import Button from '../Components/Button'
import LoginAction from '../Redux/LoginRedux'
import TextInputWithIcon from '../Components/TextInputWithIcon'

// Styles
import styles from './Styles/LoginStyle'
import { Colors } from '../Themes/index'

class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
      keyboardOpen: false,
      mobile: '',
      password: '',
    }

    this.gradient = {
      colors: [
        'rgba(255, 255, 255, 0.1)',
        'rgba(27, 163, 156, 0.6)',
        'rgba(0, 0, 0, 0.9)',
      ],
      locations: [
        0, 0.35, 0.75
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

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
        />
        <Image
          style={styles.backgroundImage}
          source={require('../Images/login-background.jpg')}
        />
        <LinearGradient
          colors={this.gradient.colors}
          style={styles.gradientBackground}
        >
          {this.renderLogo()}
          {this.renderForm()}
        </LinearGradient>

      </KeyboardAvoidingView>
    )
  }

  renderLogo () {
    return (
      this.state.keyboardOpen ?
      null :
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>
          ninix
        </Text>
      </View>
    )
  }

  renderForm () {
    const { mobile, password } = this.state
    const { login } = this.props
    const { navigate } = this.props.navigation

    return (
      <View style={styles.formContainer}>
        {this.renderError()}

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
          placeholder='Mobile Number'
        />
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
          placeholder='Password'
        />

        {this.renderActivityIndicator()}

        <Text
          style={styles.linkContainer}>
          Forgot Your Login Details? { ' ' }
          <Text
            onPress={() => navigate('ForgotPassword')}
            style={styles.link}
          >
            Retrieve Now
          </Text>
        </Text>
        <Text
          onPress={() => navigate('Signup')}
          style={styles.footerText}>Signup</Text>

      </View>
    );
  }

  validate () {
    const {mobile, password} = this.state
    const regex = new RegExp(/^09\d{9}$/)
    return regex.test(mobile) && password.length > 0
  }

  renderError () {
    const { login } = this.props
    return (
      login.error ?
      <Text style={styles.error}>
        {login.error}
      </Text> : null
    )
  }

  renderActivityIndicator () {
    const { login, loginRequest } = this.props
    const { mobile, password } = this.state
    return (
      login.fetching ?
      <ActivityIndicator/> :
      <Button
          disabled={!this.validate()}
          containerStyle={styles.buttonStyle}
          color={Colors.white}
          backgroundColor={Colors.primary}
          onPress={() => {
            loginRequest(mobile, password)
            Keyboard.dismiss()
          }}
        >
          Login
        </Button>
    )
  }
}

const mapStateToProps = (state) => {
  const { login } = state
  return {
    login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (mobile, password) => dispatch(LoginAction.request(mobile, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
