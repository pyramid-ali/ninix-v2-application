// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text } from 'react-native'

// Styles
import styles from './Styles/ForgotPasswordStyle'

class ForgotPassword extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ForgotPassword Container</Text>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
