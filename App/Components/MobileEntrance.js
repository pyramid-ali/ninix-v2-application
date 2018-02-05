import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native'
import styles from './Styles/MobileEntranceStyle'
import TextInputWithIcon from './TextInputWithIcon';
import Button from './Button';
import Colors from '../Themes/Colors';

export default class MobileEntrance extends Component {

  static defaultProps = {
    title: 'Mobile Number',
    description: 'Please Enter Your Mobile Number',
    fetching: false,
    valid: true,
    onChangeValue: () => {},
    onPress: () => {},
    defaultValue: '09'
  }

  render() {

    const {title, description, onChangeValue, value, fetching} = this.props

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
