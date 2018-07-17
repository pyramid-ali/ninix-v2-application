// Libraries
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Styles
import styles from './Styles/ButtonStyle';

export default class Button extends Component {
  render() {
    const {
      backgroundColor,
      children,
      color,
      containerStyle,
      disabled,
      onPress,
    } = this.props;

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.buttonContainer, containerStyle]}
      >
        <Text
          style={[
            styles.buttonText,
            { backgroundColor, color },
            disabled ? styles.disabled : null,
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: 'white',
  color: 'black',
  disabled: false,
  onPress: () => {},
};
