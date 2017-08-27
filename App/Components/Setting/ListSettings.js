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
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor (props) {
    super(props)
    this.state = {
      showList : false
    }
  }

  render () {
    const data = [
      {
        key: '1',
        value: 'A+'
      },
      {
        key: '2',
        value: 'A-'
      }
    ]
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => this.setState({showList: true})}
        >
          <Text>Blood Group</Text>
          <Icon name="angle-right" size={16} />
        </TouchableOpacity>
        <Modal
          visible={this.state.showList}
          onRequestClose={() => this.setState({showList: false})}
          animationType="slide"
        >
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => this.setState({showList: false})}>
              <Icon style={styles.navBarIcon} name="arrow-left" size={18} />
            </TouchableOpacity>
            <Text>{'Profile Setting'.toUpperCase()}</Text>
          </View>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={this.renderItem.bind(this)}
          />
        </Modal>
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
