// Libraries
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

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
    const { temperature, respiratory, humidity, orientation } = vitalSigns

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.row, styles.withBorder]}>
          <View style={[styles.column, styles.leftColumn]}>
            <View style={styles.inlineBox}>
              <Image style={styles.iconImage} source={require('../Images/Dashboard/2-3.png')} />
              <Text style={styles.statText}>{temperature >= 0 ? this.round(temperature) : 'NA'} °C</Text>
            </View>
          </View>
          <View style={[styles.column, styles.rightColumn]}>
            <View style={styles.inlineBox}>
              <Image style={styles.iconImage} source={require('../Images/Dashboard/2-2-1.png')} />
              <Text style={styles.statText}>{humidity >= 0 ? this.pooped(humidity) : 'NA'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.column, styles.leftColumn]}>
            <View style={styles.inlineBox}>
              <Image style={styles.iconImage} source={require('../Images/Dashboard/2-4.png')} />
              <Text style={styles.statText}>{respiratory >= 0 ? this.round(respiratory) : 'NA'} BPS</Text>
            </View>
          </View>
          <View style={[styles.column, styles.rightColumn]}>
            <View style={styles.inlineBox}>
              <Image style={styles.iconImage} source={require('../Images/Dashboard/2-1-1.png')} />
              <Text style={styles.statText}>{orientation >= 0  ? this.orientation(orientation) : 'NA'}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  round (number, degree = 0) {
    return Math.round(number * Math.pow(10, degree)) / Math.pow(10, degree)
  }

  pooped (number) {
    if (number > 4) {
      return 'Pooped'
    }
    return 'Normal'
  }

  orientation (number) {
    switch (number) {
      case 0:
        return 'Prone'
      case 1:
        return 'Normal'
      default:
        return 'Unknown'
    }
  }

}
