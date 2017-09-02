import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native'
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
    const { onSelect, title } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touch}
          onPress={onSelect.bind(this)}
        >
          <Text>{title.toUpperCase()}</Text>
          <Icon name="angle-right" size={16} />
        </TouchableOpacity>
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
