import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import EntryTemplate from './EntryTemplate'
import { NavigationActions } from 'react-navigation'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserAction from '../../../Redux/UserRedux'

// Styles
import styles from '../../Styles/PasswordEntryStyle'
import TextInputWithIcon from '../../../Components/TextInputWithIcon'
import Colors from '../../../Themes/Colors'
import Button from '../../../Components/Button'
import Icon from 'react-native-vector-icons/FontAwesome'


class PasswordEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPassword: false,
      password: ''
    }
  }

  render () {
    const { showPassword } = this.state
    const { params } = this.props.navigation.state
    const { user } = this.props
    return (
      <EntryTemplate
        title="Choose Password"
        imageSource={require('../../../Images/Signup/4-1.png')}>
        <View style={styles.form}>

          {this.renderError(user.error)}

          <Text style={styles.password}>{params.password}</Text>
          <Text style={styles.description}>
            This password automatically generated for your account
          </Text>

          <Text
            onPress={() => {
              this.setState({
                showPassword: !showPassword
              })
            }}
            style={styles.link}>
            {showPassword ? 'Use Generated Password' : 'Set New Password'}
          </Text>
          {showPassword ?
            this.renderPasswordBox()
            :
            <Button
              onPress={this.onSuccess.bind(this)}
              color={Colors.white}
              backgroundColor={Colors.dark}>
              Accept
            </Button>
          }
        </View>
      </EntryTemplate>
    )
  }

  renderError (error) {
    return (
      error ?
      <Text style={styles.error}>
        {error}
      </Text> :
      null
    )
  }
  renderPasswordBox () {
    const { user, changePassword } = this.props
    const { showPassword, password } = this.state
    const { params } = this.props.navigation.state
    return (
      <View>
        <TextInputWithIcon
        ref="passwordInput"
        secureTextEntry={!showPassword}
        selectionColor="black"
        icon="key"
        size={20}
        color={Colors.dark}
        onChangeText={(password) => this.setState({password})}
        placeholder='New Password'/>
        {user.fetching ?
          <ActivityIndicator /> :
          <Button
            disabled={password.length < 6}
            onPress={() => {
              const { passwordInput } = this.refs
              changePassword(password, params.password, this.onSuccess.bind(this))
              passwordInput.blur()
            }}
            color={Colors.white}
            backgroundColor={Colors.dark}>
            Change Password
          </Button>
        }
      </View>
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
  const { user } = state
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (newPassword, oldPassword, callback) => dispatch(UserAction.changePassword(newPassword, oldPassword, callback)),
    resetTo: (action) => dispatch(action)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEntry)
