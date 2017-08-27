import { TabNavigator, TabBarBottom } from 'react-navigation'
import Dashboard from '../Containers/MainContainer/Dashboard'
import Charts from '../Containers/MainContainer/Charts'
import Profile from '../Containers/MainContainer/Profile'
import Device from '../Containers/MainContainer/Device'
import Settings from '../Containers/MainContainer/Settings'
import Colors from '../Themes/Colors'
import styles from './Styles/MainNavigationStyle'

const config = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: Colors.dark,
    //activeBackgroundColor: Colors.alert,
    inactiveTintColor: Colors.gray,
    //inactiveBackgroundColor: Colors.dark,
    showLabel: true,
    style: styles.container,
    labelStyle: styles.label,
    tabStyle: styles.tab
  },
  initialRouteName: 'Profile',
  order: [
    'Dashboard', 'Charts', 'Profile', 'Device', 'Settings'
  ]
}

const MainNavigation = TabNavigator({
  Dashboard: {
    screen: Dashboard
  },
  Charts: {
    screen: Charts
  },
  Profile: {
    screen: Profile
  },
  Device: {
    screen: Device
  },
  Settings: {
    screen: Settings
  }
}, config)

export default MainNavigation
