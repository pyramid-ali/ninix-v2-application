// Libraries
import React, { Component } from 'react'
import { View, FlatList } from 'react-native'

// Dependencies
import NotificationItem from './NotificationItem'

// Styles
import styles from './Styles/NotificationListStyle'

export default class NotificationList extends Component {

  render () {
    const { navigation } = this.props
    const { key } = navigation.state
    const data = [
      {
        key: '1',
        date: new Date(),
        type: 'danger',
        text: `Respiratory rate goes under 20 bps, please be aware, check your baby`,
        problem: 'tangie-nafas'
      },
      {
        key: '2',
        date: new Date(),
        type: 'warning',
        text: `your baby is on prone, please rotate your baby to normal orientation`,
        problem: 'tangie-nafas'
      },
      {
        key: '3',
        date: new Date(),
        type: 'normal',
        text: `maybe your baby pooped, please  check his diaper`,
        problem: 'tangie-nafas'
      }
    ]

    const filtered = this.filter(data, key)

    return (
      <FlatList
        data={filtered}
        style={styles.container}
        renderItem={this.renderItem.bind(this)}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }

  renderItem (input) {
    const { item } = input
    return (
      <NotificationItem {...item} />
    )
  }

  renderSeparator () {
    return (
      <View style={styles.separator} />
    )
  }

  filter (data, key) {

    if (key.toLowerCase() === 'all') {
      return data
    }
    else {
      return data.filter((item) => {
        return item.type.toLowerCase() === key.toLowerCase()
      })
    }
  }
}
