// Libraries
import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import moment from 'moment'

// Dependencies
import NotificationItem from './NotificationItem'


// Styles
import styles from './Styles/NotificationListStyle'
import Colors from "../Themes/Colors";

class NotificationList extends Component {

  render () {
    console.tron.log({log: 'hello', data: this.props.alarm})
    const { navigation } = this.props
    const { key } = navigation.state
    const data = this.props.alarm[key.toLowerCase()]
    const manipulated = Object.keys(data).map(k => ({key: k, type: key.toLowerCase(), repeat: data[k].repeat, date: moment(k * 1000)}))

    return (
      <View>
        { manipulated.map(item => {
          return (
            <ListItem
              key={key}
              leftIcon={{name: 'error', color: Colors.alert}}
              title={`your baby ${item.type} is in danger position, please check your baby`}
              titleStyle={{color: Colors.dark, fontSize: 14}}
              subtitle={`this last about ${item.repeat} seconds`}
              subtitleStyle={{fontFamily: 'PoiretOne-Regular'}}
              rightTitle={item.date.fromNow()}
              rightTitleStyle={{fontSize: 10, color: Colors.gray}}
            />
          )
        })
        }
      </View>
    )

    // return (
    //   <FlatList
    //     data={filtered}
    //     style={styles.container}
    //     renderItem={this.renderItem.bind(this)}
    //     ItemSeparatorComponent={this.renderSeparator}
    //   />
    // )
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

const mapStateToProps = (state) => {
  const { alarm } = state
  return {
    alarm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)
