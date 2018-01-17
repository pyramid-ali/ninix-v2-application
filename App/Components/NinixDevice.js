import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import styles from './Styles/NinixDeviceStyle'
import Colors from '../Themes/Colors'

export default class NinixDevice extends Component {
  // Prop type warnings
  static propTypes = {
    size: PropTypes.number,
  }

  // Defaults for props
  static defaultProps = {
    size: 250,
    lightColor: Colors.primary,
    logo: 'NINIX',
    blink: true,
    onPress: () => null
  }

  constructor(props) {
    super(props)
    this.state = {
      blink: new Animated.Value(0),
      stopAnimation: false
    }
  }

  componentDidMount() {

  }

  componentDidUpdate () {
    if (this.props.blink) {
      if (this.state.stopAnimation) {
        this.setState({
          stopAnimation: false
        })
      }
      this.startAnimation()
    }
    else {
      if (!this.state.stopAnimation) {
        this.setState({
          stopAnimation: true
        })
      }
    }
  }

  startAnimation() {
    const { blink } = this.state

    Animated.timing(blink, {
      toValue: 1,
      duration: 1000
    }).start(() => {
      blink.setValue(0)
      if (!this.state.stopAnimation) {
        this.startAnimation()
      }
    })
  }

  render () {
    const { containerStyle, lightColor, logo, onPress } = this.props
    const { outerCircleStyle, innerCircleStyle, lightContainerStyle, lightStyle, logoStyle } = this.styleSheets()

    const backgroundColor = this.state.blink.interpolate({
      inputRange: [0, 1],
      outputRange: [lightColor, Colors.gray]
    })



    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.outerCircle, outerCircleStyle]}>
          <View style={[styles.innerCircle, innerCircleStyle]}>
            <TouchableOpacity onPress={onPress}>
              <Text style={[logoStyle]}>{ logo.toUpperCase() }</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.lightContainer, lightContainerStyle]}>
            <Animated.View style={[styles.light, lightStyle, {backgroundColor}]} />
          </View>
        </View>
      </View>
    )
  }

  calculateFontSize(logo) {
    const arr = logo.split('\n')
    const length = arr.map(item => item.length)
    length.sort((a, b) => b -a)
    return length[0]
  }

  styleSheets() {
    const { size, logo } = this.props
    return StyleSheet.create({
      outerCircleStyle: {
        width: size,
        height: size,
        borderRadius: size / 2
      },
      innerCircleStyle: {
        width: size * 0.6,
        height: size * 0.6,
        borderRadius: size * 0.3
      },
      lightContainerStyle: {
        width: size / 8,
        height: size / 4,
        borderRadius: size / 16,
        left: size / 2 - size / 20,
        top: size / 2 - size / 8 + size * 0.3,
      },
      lightStyle: {
        width: size / 18,
        height: size / 6,
        borderRadius: size / 32
      },
      logoStyle: {
        textAlign: 'center',
        fontSize: (4 / 5) * (size / this.calculateFontSize(logo))
      }
    })
  }
}
