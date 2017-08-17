import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/VitalSignsBoxStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class VitalSignsBox extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const { containerStyle } = this.props
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.row, styles.withBorder]}>
          <View style={[styles.column, styles.leftColumn]}>
            <View style={styles.inlineBox}>
              <Icon name="rocket" size={20} color='white' />
              <Text style={styles.statText}>18 C</Text>
            </View>
          </View>
          <View style={[styles.column, styles.rightColumn]}>
            <View style={styles.inlineBox}>
              <Icon name="rocket" size={20} color='white' />
              <Text style={styles.statText}>Pooped</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.column, styles.leftColumn]}>
            <View style={styles.inlineBox}>
              <Icon name="rocket" size={20} color='white' />
              <Text style={styles.statText}>24 BPS</Text>
            </View>
          </View>
          <View style={[styles.column, styles.rightColumn]}>
            <View style={styles.inlineBox}>
              <Icon name="rocket" size={20} color='white' />
              <Text style={styles.statText}>On Back</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
