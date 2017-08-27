import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import styles from './Styles/EditableImageStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class EditableImage extends Component {
  // Prop type warnings
  static propTypes = {
    source: PropTypes.number.isRequired,
  }

  // Defaults for props
  static defaultProps = {
    icon: 'pencil',
    size: 150,
    onPress: () => null
  }

  render () {
    const { source, icon, size, style, iconStyle, onPress } = this.props
    const innerStyle = this.styles()

    return (
      <View style={styles.container}>
        <Image style={[styles.image, innerStyle.image, style]} source={source} />
        <View style={[styles.imageIconContainer, innerStyle.imageIconContainer, iconStyle]}>
          <TouchableOpacity onPress={onPress}>
            <Icon name={icon} size={size * 0.18} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  styles () {
    const { size } = this.props
    return StyleSheet.create({
      image: {
        width: size,
        height: size,
        borderRadius: size / 2
      },
      imageIconContainer: {
        width: size / 3,
        height: size / 3,
        borderRadius: size / 6
      }
    })
  }

}
