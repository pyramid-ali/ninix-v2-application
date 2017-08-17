import { TabNavigator, TabBarTop } from 'react-navigation'
import NotificationList from '../Containers/NotificationList'
import Colors from '../Themes/Colors'
import styles from './Styles/NotificationNavigationStyle'

const config = {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
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
  initialRouteName: 'All',
  order: [
    'All', 'Danger', 'Warning', 'Normal'
  ]
}

const NotificationNavigation = TabNavigator({
  All: {
    screen: NotificationList,
    param: {
      type: 'all'
    }
  },
  Danger: {
    screen: NotificationList
  },
  Warning: {
    screen: NotificationList
  },
  Normal: {
    screen: NotificationList
  }
}, config)

export default NotificationNavigation
