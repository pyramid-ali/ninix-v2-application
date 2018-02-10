// Libraries
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import PropTypes from 'prop-types'

// Styles
import styles from './Styles/ArrowImageStyle'

export default class ArrowImage extends Component {

  render () {
    const { containerStyle, imageStyle, source } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.leftArrow, styles.arrow]} />
        <Image style={[styles.image, imageStyle]} source={source} />
        <View style={[styles.rightArrow, styles.arrow]} />
      </View>
    )
  }

}

ArrowImage.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  imageStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  source: PropTypes.number.isRequired
}
