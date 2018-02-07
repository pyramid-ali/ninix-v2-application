// Libraries
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Animated } from 'react-native'

// Styles
import styles from './Styles/IntroductionStyle'

export default class Introduction extends Component {

  render () {
    const {
      children,
      containerStyle,
      imageStyle,
      source,
      title,
      titleStyle,
    } = this.props

    const opacity = this.renderAnimation()
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.imageContainer}>
          <Animated.Image
            style={[styles.image, imageStyle, {opacity}]}
            source={source}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, titleStyle]}>{title.toUpperCase()}</Text>
          <Text style={styles.description}>{children}</Text>
        </View>
      </View>
    )
  }

  renderAnimation() {
    const { progress } = this.props
    return progress.interpolate({
      inputRange: [
        -Infinity, -0.5, 0, 0.5, Infinity
      ],
      outputRange: [
        0, 0.5, 1, 0.5, 0
      ]
    })
  }
}

Introduction.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  imageStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  source: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
}
