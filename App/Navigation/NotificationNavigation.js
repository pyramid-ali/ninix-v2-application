import { TabNavigator, TabBarTop } from 'react-navigation'
import NotificationList from '../Components/NotificationList'
import Colors from '../Themes/Colors'
import styles from './Styles/NotificationNavigationStyle'

const config = {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: false,
  tabBarOptions: {
    activeTintColor: Colors.white,
    inactiveTintColor: Colors.gray,
    showLabel: true,
    upperCaseLabel: true,
    pressColor: Colors.primary,
    pressOpacity: 0.5,
    tabStyle: styles.tab,
    indicatorStyle: styles.indicator,
    labelStyle: styles.label,
    iconStyle: styles.icon,
    style: styles.container,
  },
  initialRouteName: 'Temperature',
  order: [
    'Temperature', 'Respiratory', 'Orientation'
  ]
}

const NotificationNavigation = TabNavigator({

  Temperature: {
    screen: NotificationList,
    param: {
      type: 'temperature'
    }
  },
  Respiratory: {
    screen: NotificationList
  },
  Orientation: {
    screen: NotificationList
  }
}, config)

export default NotificationNavigation
