// Libraries
import React, { Component } from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'

// Dependencies
import Button from './Button'
import TextInputWithIcon from './TextInputWithIcon'

// Styles
import Colors from '../Themes/Colors'
import styles from './Styles/MobileEntranceStyle'

export default class MobileEntrance extends Component {

  render() {

    const {
      description,
      fetching,
      onChangeValue,
      title,
      value
    } = this.props

    return (
      <View>

        <Text style={styles.title}>
          { title }
        </Text>
        <Text style={styles.description}>
          { description }
        </Text>
        <TextInputWithIcon
          icon="mobile"
          ref="mobileInput"
          size={20}
          keyboardType="phone-pad"
          selectionColor={Colors.dark}
          color={Colors.dark}
          value={value}
          editable={!fetching}
          onChangeText={onChangeValue}
          placeholder='Enter your mobile'/>
        {fetching ? <ActivityIndicator size={24}/> : this.renderActivateButton()}
      </View>
    )
  }

  renderActivateButton() {
    const {onPress, valid} = this.props
    const {mobileInput} = this.refs

    return (
      <Button
        disabled={!valid}
        color={Colors.white}
        backgroundColor={Colors.dark}
        onPress={() => {
          onPress()
          mobileInput.blur()
        }}>
        Confirm
      </Button>
    )

  }

}

MobileEntrance.propTypes = {
  description: PropTypes.string,
  fetching: PropTypes.bool,
  onChangeValue: PropTypes.func,
  onPress: PropTypes.func,
  title: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string
}

MobileEntrance.defaultProps = {
  description: 'Please Enter Your Mobile Number',
  fetching: false,
  onChangeValue: () => {},
  onPress: () => {},
  title: 'Mobile Number',
  valid: true,
}
