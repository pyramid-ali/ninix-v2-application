import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/SuffixTextStyle'

export default class SuffixText extends Component {

  render () {

    const { children, suffix, textStyle, suffixStyle, containerStyle } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, textStyle]}>
          { children }
        </Text>
        <Text style={[styles.suffix, suffixStyle]}>{ suffix }</Text>
      </View>
    )
  }
}

SuffixText.propTypes = {
  suffix: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  suffixStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
}

SuffixText.defaultProps = {

}
