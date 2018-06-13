import React, { Component } from 'react'
import { ScrollView, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Header, ListItem } from 'react-native-elements'
import _ from 'lodash'
import moment from 'moment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NotificationStyle'
import Colors from '../Themes/Colors'

class Notification extends Component {
  constructor (props) {
    super(props)
    this.state = {}
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
    console.tron.log({notifications})
    return (
      <ScrollView style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: Colors.secondary}}
          backgroundColor={Colors.secondary}
          centerComponent={{ text: 'Notifications', style: { color: '#fff' } }}
        />
        { notifications.map(notification => {
          let icon, color
          if (notification.type === 'temperature') {
            icon = 'temperature-celsius'
            color = Colors.alert
          }
          else if (notification.type === 'respiratory') {
            icon = 'weather-windy'
            color = Colors.normal
          }
          else if (notification.type === 'orientation') {
            icon = 'undo'
            color = Colors.warning
          }
          console.tron.log({r: notification.registerAt})
          return (
            <ListItem
              key={notification.type + notification.registerAt}
              title={_.capitalize(notification.type)}
              subtitle={`your baby ${notification.type} is in dangerous condition`}
              subtitleStyle={{fontFamily: 'PoiretOne-Regular'}}
              rightTitle={moment(notification.registerAt).fromNow()}
              rightTitleStyle={{fontFamily: 'Courgette-Regular'}}
              leftIcon={{name: icon, type: 'material-community', color}}
              bottomDivider
            />
          )
        })}
      </ScrollView>
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
