import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Image } from 'react-native'
import styles from './Styles/ArrowImageStyle'

export default class ArrowImage extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    source: require('../Images/login-background.jpg')
  }

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
