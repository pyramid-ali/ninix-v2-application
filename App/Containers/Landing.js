// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { Pages} from 'react-native-pages'

// Dependencies
import { AppState } from '../Redux/AppStateRedux'
import Introduction from '../Components/Introduction'
import PageIndicator from '../Components/PageIndicator'

// Data
import introductions from '../Fixtures/IntroductionContent'

// Styles
import styles from './Styles/LandingStyle'

class Landing extends Component {

  render () {

    const { introduceApp } = this.props
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Pages renderPager={this.renderPager.bind(this)}>

          {this.renderPage(introductions)}

        </Pages>
        <TouchableOpacity
          onPress={() => {
            introduceApp()
            navigate('Login')
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderPage (introductions) {
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

// TODO: don't show landing page after first time
const mapDispatchToProps = (dispatch) => {
  return {
    introduceApp: () => dispatch(AppState.introduce())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
