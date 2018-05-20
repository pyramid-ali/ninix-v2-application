// Libraries
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

import DataDisplay from '../Transform/DataDisplay'

// Styles
import styles from './Styles/VitalSignsBoxStyle'

export default class VitalSignsBox extends Component {

  static defaultProps = {
    vitalSigns : {
      temperature: null,
      respiratory: null,
      humidity: null,
      orientation: null
    }
  }

  render () {

    const { containerStyle, vitalSigns } = this.props

    // TODO: change name of images
    // TODO: change the way of showing vital signs, define for each a function

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.row, styles.withBorder]}>
          <View style={[styles.column, styles.leftColumn]}>
            <View style={styles.inlineBox}>
              <Image style={styles.iconImage} source={require('../Images/Dashboard/2-3.png')} />
              <Text style={styles.statText}>{DataDisplay.temperature(vitalSigns)}</Text>
            </View>
          </View>
          <View style={[styles.column, styles.rightColumn]}>
            <View style={styles.inlineBox}>
              <Image style={styles.iconImage} source={require('../Images/Dashboard/2-2-1.png')} />
              <Text style={styles.statText}>{DataDisplay.humidity(vitalSigns)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.column, styles.leftColumn]}>
            <View style={styles.inlineBox}>
              <Image style={styles.iconImage} source={require('../Images/Dashboard/2-4.png')} />
              <Text style={styles.statText}>{DataDisplay.respiratory(vitalSigns)} </Text>
            </View>
          </View>
          <View style={[styles.column, styles.rightColumn]}>
            <View style={styles.inlineBox}>
              <Image style={styles.iconImage} source={require('../Images/Dashboard/2-1-1.png')} />
              <Text style={styles.statText}>{DataDisplay.orientation(vitalSigns)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

}

VitalSignsBox.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  vitalSigns: PropTypes.array
}
