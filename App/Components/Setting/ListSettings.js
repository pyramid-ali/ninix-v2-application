import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList, Modal, TouchableOpacity, Picker } from 'react-native'
import styles from './Styles/ListSettingsStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../NavigationBar'
import Colors from '../../Themes/Colors'

export default class ListSettings extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    showList: false
  }

  render () {
    const { onSelect, title, items, value } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{value ? value : 'Select'}</Text>
          <Icon style={styles.icon} name="sliders" size={18} color={Colors.dark} />
        </View>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => {onSelect(itemValue, itemIndex)}}>
          {items.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.label ? item.label : item.value} value={item.value} />
            )
          })}
        </Picker>

      </View>
    )
  }

  renderItem (input) {
    const { item, index } = input
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {item.value}
        </Text>
        <Icon name="check" size={16} color={Colors.primary} />
      </View>
    )
  }
}
