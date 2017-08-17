import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, Animated } from 'react-native'
import styles from './Styles/IntroductionStyle'

export default class Introduction extends Component {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.object
  }

  static defaultProps = {
    title: '',
    source: require('../Images/test.png'),
    styleTitle: null,
    styleContainer: null,
    imageStyle: null
  }

  render () {
    const { source, title, children, containerStyle, titleStyle, imageStyle } = this.props
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
    const {progress, index} = this.props
    const opacity = progress.interpolate({
      inputRange: [
        -Infinity,
        -0.5,
        0,
        0.5,
        Infinity
      ],
      outputRange: [
        0,
        0.5,
        1,
        0.5,
        0
      ]
    })
    return opacity
  }
}
