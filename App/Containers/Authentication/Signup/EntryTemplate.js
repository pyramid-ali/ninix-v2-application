import React, { Component } from 'react'
import { View, Text, Image, Keyboard, Animated, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../Styles/EntryTemplateStyle'

class EntryTemplate extends Component {
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
    Animated.timing(
      this.state.marginTop,
      {
        toValue: -400,
        duration: 1000
      }
    ).start()
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
    rightBarButton: <Text/>
  }

  render () {
    const { children, imageSource, leftBarButton, rightBarButton, title } = this.props
    const { marginTop } = this.state
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.wrapper}>
        <View style={styles.navBar}>
          {leftBarButton}
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          {rightBarButton}
        </View>
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryTemplate)
