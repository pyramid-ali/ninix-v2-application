import React, { Component } from 'react'
import { View, Text, processColor } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ChartStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

class Chart extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    const { routeName } = navigation.state

    const iconName = (routeName) => {
      switch (routeName) {
        case 'Temperature':
          return 'thermometer-half'
        case 'Respiratory':
          return 'bolt'
        case 'Orientation':
          return 'exchange'
        case 'Poop':
          return 'lightbulb-o'
      }
    }

    return {
      tabBarIcon: <Icon size={20} name={iconName(routeName)} color="white" />
    }
  }

  render () {
    return (
      <View style={styles.container}>
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
