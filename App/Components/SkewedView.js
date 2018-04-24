import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styleCreator from './Styles/SkewedViewStyle'
import Colors from '../Themes/Colors';

export default class SkewedView extends Component {

  render () {

    const { children, degree, height, weight, topColor, bottomColor } = this.props
    const styles = styleCreator(degree, height, weight)

    return (
      <View style={[styles.wrapper, {backgroundColor: bottomColor}]}>
        <View style={[styles.top, {backgroundColor: topColor}]}>
          <View style={styles.skewInner}>
            { children[0] }
          </View>
        </View>
        <View style={styles.bottom}>
          { children[1] }
        </View>
      </View>
    )
  }
}

SkewedView.propTypes = {
  weight: PropTypes.number,
  height: PropTypes.number,
  degree: PropTypes.number,
  topColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottomColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

SkewedView.defaultProps = {
  degree: 20,
  topColor: Colors.secondary,
  bottomColor: Colors.alert
}
