import React, { Component } from 'react'
import { ScrollView, View, WebView } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PrivacyPolicyStyle'
import Colors from "../Themes/Colors";
import Metrics from "../Themes/Metrics";

class PrivacyPolicy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: 0
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: Colors.primary}}
          backgroundColor={Colors.primary}
          centerComponent={{ text: 'Privacy Policy', style: { color: '#fff' } }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack() }}
        />

          <WebView
            style={{width: Metrics.screenWidth, height: this.state.height}}
            injectedJavaScript={'document.title = document.body.scrollHeight;window.location.hash = 1;'}
            source={{uri: 'https://github.com/'}}
            scrollEnabled={false}
            onNavigationStateChange={(e) => {
              this.setState({height: Number(e.title)})
            }}
          />

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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy)
