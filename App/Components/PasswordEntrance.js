// Libraries
import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

// Dependencies
import Button from './Button';
import TextInputWithIcon from './TextInputWithIcon';

// Styles
import styles from './Styles/PasswordEntranceStyle';
import Colors from '../Themes/Colors';

export default class PasswordEntrance extends Component {
  render() {
    const {
      title,
      description,
      placeholder,
      value,
      fetching,
      onChangeValue,
    } = this.props;

    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TextInputWithIcon
          secureTextEntry={true}
          icon="key"
          ref="passwordInput"
          size={20}
          selectionColor={Colors.dark}
          color={Colors.dark}
          value={value}
          editable={!fetching}
          onChangeText={onChangeValue}
          placeholder={placeholder}
        />
        {fetching ? (
          <ActivityIndicator size={24} />
        ) : (
          this.renderActivateButton()
        )}
      </View>
    );
  }

  renderActivateButton() {
    const { onPress, valid } = this.props;
    const { passwordInput } = this.refs;

    return (
      <Button
        disabled={!valid}
        color={Colors.white}
        backgroundColor={Colors.dark}
        onPress={() => {
          onPress();
          passwordInput.blur();
        }}
      >
        Set Password
      </Button>
    );
  }
}

PasswordEntrance.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  fetching: PropTypes.bool,
  onChangeValue: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  value: PropTypes.string,
};

PasswordEntrance.defaultProps = {
  title: 'Password',
  description:
    'please enter your password, password should not be smaller than 6 characters',
  placeholder: 'Enter your password',
  fetching: false,
  valid: true,
};
