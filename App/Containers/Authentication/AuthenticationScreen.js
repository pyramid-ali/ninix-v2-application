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
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { accessAbility } = this.props
    return (
      <View style={styles.container}>
        {
          accessAbility.isConnected ?
            null :
            <StickyAlert
              leftIcon="info">
              No Internet Connection
            </StickyAlert>
        }
        <AuthenticationNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { accessAbility } = state
  return {
    accessAbility
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreen)
