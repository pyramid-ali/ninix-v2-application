import React, { Component } from 'react'
import { ScrollView, Text, View, Image, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import TextInputWithIcon from '../../Components/TextInputWithIcon'
import Button from '../../Components/Button'
import Signup from '../../Redux/SignupRedux'
import Login from '../../Redux/LoginRedux'

// Styles
import styles from '../Styles/LoginPageStyle'
import { Colors } from '../../Themes/index'


class LoginPage extends Component {
  state = {
    keyboardOpen: false,
    mobile: '',
    password: '',
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
    const colors = [
      'rgba(0, 0, 0, 0.9)',
      'rgba(27, 163, 156, 0.6)',
      'rgba(255, 255, 255, 0.4)'
    ]
    const { mobile, password } = this.state
    const { navigate } = this.props.navigation
    const { requestLogin, login, accessAbility } = this.props
    const start = {
      x: 0,
      y: 0.9
    }
    const end = {
      x: 1,
      y: 0.1
    }
    return (
      <KeyboardAvoidingView
        onKeyboardChange={(event) => {
          console.log(event, 'keyboard changed')
        }}
        behavior='padding'
        style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../../Images/login-background.jpg')}>
          <LinearGradient
            start={start}
            end={end}
            locations={[0, 0.6, 0.85]}
            colors={colors}
            style={styles.gradientBackground}>
            {this.state.keyboardOpen ? null : <View style={styles.logoContainer}>
              <Text style={styles.logo}>
                NiNiX
              </Text>
            </View>}

            <View style={styles.formContainer}>
              {
                login.error ?
                  <Text style={styles.error}>
                    {login.error}
                  </Text> :
                  null
              }
                <TextInputWithIcon
                  keyboardType="phone-pad"
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
              {
                login.isFetchingUser ?
                <ActivityIndicator/> :
                <Button
                  disabled={!this.verification()}
                  containerStyle={styles.buttonStyle}
                  color={Colors.white}
                  backgroundColor={Colors.primary}
                  onPress={() => {
                    requestLogin(mobile, password)
                    Keyboard.dismiss()
                  }}
                >
                  Login
                </Button>
              }
                <Text
                  style={styles.linkContainer}>
                  Forgot Your Login Details?
                  <Text
                    onPress={() => alert('forgot password')}
                    style={styles.link}> Retrieve Now</Text>
                </Text>
                <Text
                  onPress={() => {
                    this.props.signup(this.props.navigation)
                    //this.props.navigation.navigate('MobileEntry')
                  }}
                  style={styles.footerText}>Signup</Text>
              </View>
          </LinearGradient>
        </Image>
      </KeyboardAvoidingView>
    )
  }

  verification() {
    const {accessAbility} = this.props
    const {mobile, password} = this.state
    return mobile.length === 11 && password.length > 0 && accessAbility.isConnected
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
    requestLogin: (mobile, password) => dispatch(Login.request(mobile, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
