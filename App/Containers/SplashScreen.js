import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SplashScreenStyle'


class SplashScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.startup()
    }, 4 * 1000)

    let counter = 0
    const logoCharacters = ['N', 'I', 'N', 'I', 'X']
    this.animationInterval = setInterval(() => {
      if(counter === logoCharacters.length) {
        clearInterval(this.animationInterval)
        return
      }
      this.setState({
        name: this.state.name + logoCharacters[counter]
      })
      counter += 1
    }, 600)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    clearInterval(this.animationInterval)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.center}>{this.state.name}</Text>
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
    startup: () => dispatch(StartupActions.startup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
