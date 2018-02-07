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
      source,
      title,
    } = this.props

    const opacity = this.renderAnimation()
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Animated.Image
            style={[styles.image, {opacity}]}
            source={source}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
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
  source: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}
