import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NotificationListStyle'
import NotificationItem from '../Components/NotificationItem'

class NotificationList extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { navigation } = this.props
    const { key } = navigation.state
    const data = [
      {
        key: '1',
        date: new Date(),
        type: 'danger',
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        problem: 'tangie-nafas'
      },
      {
        key: '2',
        date: new Date(),
        type: 'warning',
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        problem: 'tangie-nafas'
      },
      {
        key: '3',
        date: new Date(),
        type: 'normal',
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        problem: 'tangie-nafas'
      }
    ]

    const filtered = this.filter(data, key)
    console.log(key, 'key')

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
    const { item, index } = input
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
    // switch (key.toLowerCase()) {
    //   case 'danger':
    //     return data.filter((item) => {
    //       return data.type.toLowerCase() === 'danger'
    //     })
    //   case ''
    // }

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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)
