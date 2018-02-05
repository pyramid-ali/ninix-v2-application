// import Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { Pages} from 'react-native-pages'

// import Dependencies
import { AppState } from '../Redux/AppStateRedux'
import Introduction from '../Components/Introduction'
import PageIndicator from '../Components/PageIndicator'

// import Data
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
          {introductions.map((introduction, index) => {
            const {title, description, image} = introduction
            return (
              <Introduction
                key={index}
                title={title}
                source={image}
              >
                {description}
              </Introduction>
            )
          })}
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
