// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { Pages} from 'react-native-pages'

// Dependencies
import AppAction from '../Redux/AppRedux'
import Introduction from '../Components/Introduction'
import PageIndicator from '../Components/PageIndicator'

// Data
import introductions from '../Fixtures/IntroductionContent'

// Styles
import styles from './Styles/LandingStyle'

class Landing extends Component {

  // TODO: give animation when transient to another page
  render () {

    return (
      <View style={styles.container}>
        <Pages renderPager={this.renderPager.bind(this)}>

          {this.renderPages()}

        </Pages>
        <TouchableOpacity
          onPress={() => {
            this.props.introduceApp()
            this.props.navigation.navigate('Login')
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderPages () {
    return introductions.map((introduction, index) => {
      const {title, description, image} = introduction
      return (
        <Introduction key={index} title={title} source={image}>
          {description}
        </Introduction>
      )
    })
  }

  renderPager ({pages, progress}) {
    return (
      <PageIndicator
        pages={pages}
        progress={progress}
        containerStyle={styles.indicatorContainerStyle}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    introduceApp: () => dispatch(AppAction.didAppIntroduce())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
