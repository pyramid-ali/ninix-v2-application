// Libraries
import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'react-native-elements';

// Styles
import styles from './Styles/EntryTemplateStyle';
import Colors from '../Themes/Colors';

export default class EntryTemplate extends Component {
  state = {
    keyboardOpen: false,
    marginTop: new Animated.Value(0),
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    Animated.sequence([
      Animated.timing(this.state.marginTop, {
        toValue: -150,
        duration: 1,
      }),
      Animated.timing(this.state.marginTop, {
        toValue: -400,
        duration: 1000,
      }),
    ]).start();
  }

  _keyboardDidHide() {
    Animated.timing(this.state.marginTop, {
      toValue: 0,
      duration: 1000,
    }).start();
  }

  render() {
    const { children, imageSource, onPressCancel, title } = this.props;
    const { marginTop } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <Header
          statusBarProps={{ backgroundColor: Colors.dark, translucent: false }}
          backgroundColor={Colors.dark}
          centerComponent={{ text: title, style: { color: '#fff' } }}
          leftComponent={{
            icon: 'clear',
            color: '#fff',
            onPress: onPressCancel,
          }}
        />

        <View style={styles.container}>
          <View style={[styles.imageHolder]}>
            <Animated.Image
              style={[styles.image, { marginTop }]}
              source={imageSource}
            />
          </View>
          <View style={styles.formContainer}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

EntryTemplate.propTypes = {
  imageSource: PropTypes.number.isRequired,
  onPressCancel: PropTypes.func,
  title: PropTypes.string.isRequired,
};

EntryTemplate.defaultProps = {
  onPressCancel: () => {},
};
