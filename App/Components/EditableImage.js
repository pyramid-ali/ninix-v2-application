// Libraries
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker'
import PropTypes from 'prop-types'

// Styles
import Colors from '../Themes/Colors'
import styles from './Styles/EditableImageStyle'

export default class EditableImage extends Component {

  render () {
    const {
      icon,
      iconStyle,
      onPress,
      progress,
      source,
      size,
      style
    } = this.props

    const innerStyle = this.styles()

    return (
      <View style={styles.container}>
        <Image style={[styles.image, innerStyle.image, style]} source={source} />
        {
          progress !== null ?
            <View style={[styles.hover, innerStyle.image, {backgroundColor: `rgba(${Colors.blackRGB}, ${1 - progress / 200})`}]}>
              <Text style={[styles.progressText, {fontSize: size / 3}]}>{progress}%</Text>
            </View>
            :
            null
        }

        <View style={[styles.imageIconContainer, innerStyle.imageIconContainer, iconStyle]}>
          <TouchableOpacity onPress={() => this.showImagePicker(onPress)}>
            <Icon name={icon} size={size * 0.18} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  showImagePicker (callback, options = null) {
    ImagePicker.showImagePicker(options = null, callback)
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

EditableImage.propTypes = {
  icon: PropTypes.string,
  iconStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  onPress: PropTypes.func,
  progress: PropTypes.number,
  source: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  size: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ])
}

EditableImage.defaultProps = {
  icon: 'pencil',
  onPress: () => {},
  progress: 0,
  size: 150,
}
