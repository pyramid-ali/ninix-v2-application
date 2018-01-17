import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/AuthenticationScreenStyle'
import AuthenticationNavigation from '../../Navigation/AuthenticationNavigation'
import StickyAlert from '../../Components/StickyAlert'

class AuthenticationScreen extends Component {

  render () {
    return (
      <View style={styles.container}>
        <AuthenticationNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreen)
