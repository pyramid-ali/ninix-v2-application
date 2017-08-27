import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import EntryTemplate from './EntryTemplate'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../Styles/PasswordEntryStyle'
import TextInputWithIcon from '../../../Components/TextInputWithIcon'
import Colors from '../../../Themes/Colors'
import Button from '../../../Components/Button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Signup from '../../../Redux/SignupRedux'

class PasswordEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPassword: false,
      password: ''
    }
  }

  render () {
    const { showPassword, password } = this.state
    const { signup, sendPassword } = this.props
    return (
      <EntryTemplate
        title="Choose Password"
        leftBarButton={this.leftBarButton()}
        imageSource={require('../../../Images/Signup/4-1.png')}>
        <View style={styles.form}>
          {signup.error ?
            <Text style={styles.error}>
              {signup.error}
            </Text> :
            null
          }
          <Text style={styles.description}>
            Choose a password for your account
          </Text>
          <Text
            onPress={() => {
              this.setState({
                showPassword: !showPassword
              })
            }}
            style={styles.link}>
            {showPassword ? 'Hide' : 'Show'} Password
          </Text>
          <TextInputWithIcon
            ref="passwordInput"
            secureTextEntry={!showPassword}
            selectionColor="black"
            icon="key"
            size={20}
            color={Colors.dark}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'/>
          {signup.isCheckingPassword ?
            <ActivityIndicator /> :
            <Button
              disabled={password.length < 6}
              onPress={() => {
                const { passwordInput } = this.refs
                sendPassword(password)
                passwordInput.blur()
              }}
              color={Colors.white}
              backgroundColor={Colors.dark}>
              Finish
            </Button>
          }
        </View>
      </EntryTemplate>
    )
  }

  leftBarButton() {
    return (
      <TouchableOpacity
        style={{zIndex: 9999}}
        onPress={this.props.back}>
        <Text style={styles.barButtonText}>Cancel</Text>
      </TouchableOpacity>
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
    sendPassword: (password) => dispatch(Signup.checkingPassword(password)),
    back: () => dispatch(Signup.cancel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEntry)
