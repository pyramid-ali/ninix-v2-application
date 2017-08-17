import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Animated } from 'react-native'
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
    blink: true
  }

  constructor(props) {
    super(props)
    this.state = {
      blink: new Animated.Value(0)
    }
  }

  componentDidMount() {
    const { blink } = this.props
    if (blink)
      this.startAnimation()
  }

  startAnimation() {
    const { blink } = this.state
    Animated.sequence([
      Animated.timing(blink, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(blink, {
        toValue: 0,
        duration: 500
      })
    ]).start(() => {
      this.startAnimation()
    })

  }

  render () {
    const { size, containerStyle, lightColor, logo, blink } = this.props
    const outerCircleStyle = {
      width: size,
      height: size,
      borderRadius: size / 2
    }
    const innerCircleStyle = {
      width: size * 0.6,
      height: size * 0.6,
      borderRadius: size * 0.3
    }
    const lightContainerStyle = {
      width: size / 8,
      height: size / 4,
      borderRadius: size / 16,
      left: size / 2 - size / 20,
      top: size / 2 - size / 8 + size * 0.3,
    }
    const lightStyle = {
      width: size / 18,
      height: size / 6,
      borderRadius: size / 32
    }
    const backgroundColor = this.state.blink.interpolate({
      inputRange: [0, 1],
      outputRange: [lightColor, Colors.gray]
    })
    return (
      <View style={styles.container}>
        <View style={[styles.outerCircle, outerCircleStyle]}>
          <View style={[styles.innerCircle, innerCircleStyle]}>
            <Text style={{textAlign: 'center', fontSize: (size) *  (1 / logo.length)}}>{ logo }</Text>
          </View>
          <View style={[styles.lightContainer, lightContainerStyle]}>
            <Animated.View style={[styles.light, lightStyle, {backgroundColor}]} />
          </View>
        </View>
      </View>
    )
  }
}
