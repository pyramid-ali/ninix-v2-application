import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import styles from './Styles/EditableImageStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../Themes/Colors'

export default class EditableImage extends Component {
  // Prop type warnings
  static propTypes = {

  }

  // Defaults for props
  static defaultProps = {
    icon: 'pencil',
    size: 150,
    progress: 0,
    onPress: () => null
  }

  render () {
    const { source, icon, size, style, iconStyle, onPress, progress } = this.props
    const innerStyle = this.styles()

    return (
      <View style={styles.container}>
        <Image style={[styles.image, innerStyle.image, style]} source={source} />
        {
          progress !== null ?
            <View style={[styles.hover, innerStyle.image, {backgroundColor: `rgba(${Colors.blackRGB}, ${1 - progress / 200})`}]}>
              <Text style={[styles.progressText, {fontSize: size / 3}]}>{progress - 1}%</Text>
            </View>
            :
            null
        }

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
