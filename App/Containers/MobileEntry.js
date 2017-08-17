import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import EntryTemplate from './EntryTemplate'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MobileEntryStyle'
import TextInputWithIcon from '../Components/TextInputWithIcon'
import Colors from '../Themes/Colors'
import Button from '../Components/Button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Signup from '../Redux/SignupRedux'

class MobileEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: ''
    }
  }

  render () {
    const { signup, requestActivationCode } = this.props
    const { mobile } = this.state
    return (
      <EntryTemplate
        title="Signup"
        leftBarButton={this.leftBarButton()}
        imageSource={require('../Images/Signup/4-3.png')}>
        <View style={styles.form}>
          {signup.error ?
            <Text style={styles.error}>
              {signup.error}
            </Text> :
            null
          }
          <Text style={styles.description}>
            Enter Your Mobile for Receiving activation code
          </Text>
          <TextInputWithIcon
            icon="mobile"
            ref="mobileInput"
            size={20}
            selectionColor={Colors.dark}
            color={Colors.dark}
            value={mobile}
            editable={!signup.isCheckingMobile}
            onFocus={() => this.setState({ mobile: '09' })}
            onChangeText={(mobile) => this.setState({ mobile })}
            placeholder='Enter your mobile'/>
          {signup.isCheckingMobile ? <ActivityIndicator size={24} /> : this.renderActivateButton() }
        </View>
      </EntryTemplate>
    )
  }

  renderActivateButton() {
    const { requestActivationCode } = this.props
    const { mobile } = this.state
    const { mobileInput } = this.refs

    return (
      <Button
        disabled={mobile.length !== 11}
        onPress={() => {
          requestActivationCode(mobile, this.props.navigation)
          mobileInput.blur()
        }}
        color={Colors.white}
        backgroundColor={Colors.dark}>
        Activate
      </Button>
    )

  }

  leftBarButton() {
    return (
      <TouchableOpacity
        style={{zIndex: 9999}}
        onPress={this.props.back}>
        <Icon name="chevron-left" size={22} color="white" />
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
    back: () => dispatch(Signup.cancel()),
    requestActivationCode: (mobile, navigation) => dispatch(Signup.checkingMobile(mobile, navigation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileEntry)
