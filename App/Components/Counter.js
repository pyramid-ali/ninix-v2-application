import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/CounterStyle'
import { Icon } from 'react-native-elements'
import Colors from '../Themes/Colors'

export default class Counter extends Component {

  render () {

    const { plusButtonColor, minusButtonColor, children, onPlusPress, onMinusPress } = this.props

    return (
      <View
        style={styles.container}
      >
        <Icon
          reverse
          onPress={onPlusPress}
          name="keyboard-arrow-up"
          size={30}
          color={plusButtonColor}
        />

        <View>
          { children }
        </View>

        <Icon
          reverse
          onPress={onMinusPress}
          name="keyboard-arrow-down"
          size={30}
          color={minusButtonColor}
        />
      </View>
    )
  }
}

Counter.propTypes = {
  onPlusPress: PropTypes.func.isRequired,
  onMinusPress: PropTypes.func.isRequired,
  plusButtonColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minusButtonColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Counter.defaultProps = {
  plusButtonColor: Colors.primary,
  minusButtonColor: Colors.alert
}
