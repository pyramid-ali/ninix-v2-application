import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Animated } from 'react-native'
import styles from './Styles/PageIndicatorStyle'
import {Metrics, Colors} from '../Themes'

export default class PageIndicator extends Component {
  static propTypes = {
    pages: PropTypes.number.isRequired,
    progress: PropTypes.instanceOf(Animated.Value).isRequired,
    dot: PropTypes.object
  };

  static defaultProps = {
    dot: {
      size: 10,
      space: 5,
      backgroundColor: Colors.light,
      foregroundColor: Colors.primary
    }
  }

  render () {
    const { containerStyle } = this.props
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderDots()}
      </View>
    )
  }

  renderDots() {
    let { pages, progress, dot } = this.props

    const dotStyle = {
      width: dot.size,
      height: dot.size,
      borderRadius: dot.size / 2
    }

    let animatedDot = () => {

      const freeSpaceWidth = (Metrics.screenWidth - pages * (2 * dot.space + dot.size)) / 2
      const initialLeft = freeSpaceWidth + dot.space - 1
      const inputRange = Array.from(new Array(pages * 2), (pages, index) => index / 2)
      const positionOutputRange = inputRange.map((value) => {
        const newPosition = initialLeft + (value * 2) * (2 * dot.space)
        return newPosition
      })

      const widthOutputRange = inputRange.map((value) => {
        if(((value + 1) * 2)  % 2)
          return dot.size * 2
        return dot.size
      })

      const animatedDotStyle = {
        backgroundColor: dot.foregroundColor
      }

      let left = progress
        .interpolate({
          inputRange,
          outputRange: positionOutputRange
        })

      let width = progress
        .interpolate({
          inputRange,
          outputRange: widthOutputRange
        })

      return (
        <Animated.View key="-1" style={[styles.animatedDot, dotStyle, animatedDotStyle, {left, width}]} />
      )
    }

    const fixDotStyle = {
      backgroundColor: dot.backgroundColor,
      marginHorizontal: dot.space
    }

    let dots = Array.from(new Array(pages), (page, index) => {
      return (
        <View key={index} style={[styles.dots, fixDotStyle, dotStyle]} />
      )
    })

    return [animatedDot(), ...dots]
  }
}
