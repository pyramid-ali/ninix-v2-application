// Libraries
import React, { Component } from 'react'
import { View, Text, Keyboard, Animated, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types'

// Dependencies
import NavigationBar from './NavigationBar'

// Styles
import styles from './Styles/EntryTemplateStyle'

export default class EntryTemplate extends Component {

  state = {
    keyboardOpen: false,
    marginTop: new Animated.Value(0)
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    Animated.sequence([
      Animated.timing(
        this.state.marginTop,
        {
          toValue: -150,
          duration: 1
        }),
      Animated.timing(
        this.state.marginTop,
        {
          toValue: -400,
          duration: 1000
        })
    ])
    .start()
  }

  _keyboardDidHide () {
    Animated.timing(
      this.state.marginTop,
      {
        toValue: 0,
        duration: 1000
      }
    ).start()
  }

  static defaultProps = {
    leftBarButton: <Text/>,
    rightBarButton: <Text/>,
    onPressLeftButton: () => {},
    onPressRightButton: () => {}
  }

  render () {
    const {
      children,
      imageSource,
      leftBarButton,
      onPressRightBarButton,
      onPressLeftBarButton,
      rightBarButton,
      title
    } = this.props
    const { marginTop } = this.state
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.wrapper}>
        <NavigationBar
          style={styles.navBar}
          leftButton={leftBarButton}
          rightButton={rightBarButton}
          onPressRightButton={onPressRightBarButton}
          onPressLeftButton={onPressLeftBarButton}
        >
          { title }
        </NavigationBar>

        <View style={styles.container}>
          <View style={[styles.imageHolder]}>
            <Animated.Image
              style={[styles.image, {marginTop}]}
              source={imageSource} />
          </View>
          <View style={styles.formContainer}>
            { children }
          </View>
        </View>
      </KeyboardAvoidingView>

    )
  }
}

EntryTemplate.propTypes = {
  imageSource: PropTypes.number.isRequired,
  leftBarButton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  onPressRightBarButton: PropTypes.func,
  onPressLeftBarButton: PropTypes.func,
  rightBarButton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  title: PropTypes.string.isRequired
}

EntryTemplate.defaultProps = {
  onPressRightBarButton: () => {},
  onPressLeftBarButton: () => {},
}
