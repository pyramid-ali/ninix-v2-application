import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import AppAction from '../Redux/AppRedux'

// Styles
import styles from './Styles/SplashScreenStyle'

class SplashScreen extends Component {

  componentDidMount () {
    this.props.init()
    // TODO: we can show animation here
  }

  componentWillUnmount() {}

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.center}>NINIX</Text>
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
    init: () => dispatch(AppAction.init())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
