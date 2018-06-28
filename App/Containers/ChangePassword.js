import React, { Component } from 'react'
import { ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Header, Button } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Dependencies
import UserAction from '../Redux/UserRedux'

// Styles
import styles from './Styles/ChangePasswordStyle'
import Colors from "../Themes/Colors";
import DefaultTextInput from "../Components/DefaultTextInput";

class ChangePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: Colors.primary}}
          backgroundColor={Colors.primary}
          centerComponent={{ text: 'Change Password', style: { color: '#fff' } }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
        />
        <DefaultTextInput
          label="Old Password"
          secureTextEntry
          placeholder='Old Password'
          icon='key-variant'
          value={this.state.oldPassword}
          onChangeText={this.onChangeOldPassword.bind(this)}
        />
        <DefaultTextInput
          label="Password"
          secureTextEntry
          placeholder='New Password'
          icon='key-variant'
          value={this.state.newPassword}
          onChangeText={this.onChangePassword.bind(this)}
        />
        <Button
          title='Update Password'
          loading={this.props.loading}
          buttonStyle={styles.submitButton}
          onPress={this.changePassword.bind(this)}
        />
      </ScrollView>
    )
  }

  onChangeOldPassword (value) {
    this.setState({
      oldPassword: value
    })
  }

  onChangePassword (value) {
    this.setState({
      newPassword: value
    })
  }

  changePassword() {
    console.tron.log({log: 'change password'})
    const { newPassword, oldPassword } = this.state
    this.props.changePassword(newPassword, oldPassword, () => {
      Alert.alert(
        'Success',
        'Your password changed successfully',
        [
          {text: 'OK'},
        ]
      )
      this.setState({
        newPassword: '',
        oldPassword: ''
      })
    }, error => {
      Alert.alert(
        'Failure',
        error,
        [
          {text: 'OK'},
        ]
      )
    })
  }
}

const mapStateToProps = (state) => {
  const { user } = state
  return {
    loading: user.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (newPassword, oldPassword, onSuccess, onFail) => dispatch(UserAction.changePassword(newPassword, oldPassword, onSuccess, onFail))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
