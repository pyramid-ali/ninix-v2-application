import { TabNavigator, TabBarTop } from 'react-navigation'
import Chart from '../Containers/Chart'
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
    showLabel: false,
    showIcon: true,
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
    'Temperature', 'Respiratory', 'Orientation', 'Poop'
  ]
}

const ChartNavigation = TabNavigator({
  Temperature: {
    screen: Chart
  },
  Respiratory: {
    screen: Chart
  },
  Orientation: {
    screen: Chart
  },
  Poop: {
    screen: Chart
  }
}, config)

export default ChartNavigation
