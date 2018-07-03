import React, { Component } from 'react'
import { ScrollView, FlatList, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Header, ListItem } from 'react-native-elements'
import _ from 'lodash'
import moment from 'moment'

// Styles
import styles from './Styles/NotificationStyle'
import Colors from '../Themes/Colors'

class Notification extends Component {
  constructor (props) {
    super(props)
    this.keyExtractor = item => (item.type + item.registerAt)
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor(Colors.secondary, true)
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  render () {
    const notifications = this.sort()
    return (
      <ScrollView style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: Colors.secondary}}
          backgroundColor={Colors.secondary}
          centerComponent={{ text: 'Notifications', style: { color: '#fff' } }}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={notifications}
          renderItem={this.renderListItem}
        />
      </ScrollView>
    )
  }

  renderListItem ({item}) {
    let icon, color
    if (item.type === 'temperature') {
      icon = 'temperature-celsius'
      color = Colors.alert
    }
    else if (item.type === 'respiratory') {
      icon = 'weather-windy'
      color = Colors.normal
    }
    else if (item.type === 'orientation') {
      icon = 'undo'
      color = Colors.warning
    }
    return (
      <ListItem
        key={item.type + item.registerAt}
        title={_.capitalize(item.type)}
        subtitle={`your baby ${item.type} is in dangerous condition`}
        subtitleStyle={{fontFamily: 'PoiretOne-Regular'}}
        rightTitle={moment(item.registerAt).fromNow()}
        rightTitleStyle={{fontFamily: 'Courgette-Regular'}}
        leftIcon={{name: icon, type: 'material-community', color}}
        bottomDivider
      />
    )
  }

  merge() {
    const {respiratory, temperature, orientation} = this.props

    return [respiratory, temperature, orientation].reduce((acc, curr) => {
      return Object.keys(curr).reduce((obj, key) => {
        if (acc[key]) {
          return {...obj, [key]: [...acc[key], curr[key]]}
        }
        return {...obj, [key]: [curr[key]]}
      }, acc)
    }, {})
  }

  sort() {
    const all = this.merge()
    console.tron.log({all})
    return Object.keys(all).sort().map(key => all[key]).reduce((acc, curr) => [...acc, ...curr], [])
  }
}

Notification.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="bell-ring"
      type='material-community'
      color={tintColor}
    />
  ),
}

const mapStateToProps = (state) => {
  const { alarm } = state
  return {
    respiratory: alarm.respiratory,
    temperature: alarm.temperature,
    orientation: alarm.orientation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
