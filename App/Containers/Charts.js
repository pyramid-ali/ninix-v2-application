import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ChartsStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChartNavigation from '../Navigation/ChartNavigation'

class Charts extends Component {
  static navigationOptions = {
    tabBarLabel: 'Charts',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={20}
        name="area-chart"
        color={tintColor}
      />
    ),
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.top}>

        </View>
        <View style={styles.bottom}>
          <ChartNavigation />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Charts)
