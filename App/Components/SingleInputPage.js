import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import styles from './Styles/SingleInputPageStyle';

export default class SingleInputPage extends Component {
  render() {
    const { title, value, suffix, onChange } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
          officiis quo rem reprehenderit
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={'0'}
            defaultValue={value}
            underlineColorAndroid="transparent"
            onChangeText={onChange}
          />
          <Text style={styles.suffix}>{suffix}</Text>
        </View>
      </View>
    );
  }
}

SingleInputPage.propTypes = {
  title: PropTypes.string.isRequired,
  suffix: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SingleInputPage.defaultProps = {
  suffix: '',
};
