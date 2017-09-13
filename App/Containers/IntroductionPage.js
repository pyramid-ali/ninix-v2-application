import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Pages} from 'react-native-pages'
import introductions from '../Fixtures/IntroductionContent'
import { AppState } from '../Redux/AppStateRedux'
import Introduction from '../Components/Introduction'
import PageIndicator from '../Components/PageIndicator'

// Styles
import styles from './Styles/IntroductionPageStyle'

class IntroductionPage extends Component {

  render () {
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
          onPress={this.props.didAppIntroduce}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderPager({pages, progress}) {
    return <PageIndicator
              pages={pages}
              progress={progress}
              containerStyle={styles.indicatorContainerStyle}
            />
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    didAppIntroduce: () => dispatch(AppState.introduceApp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionPage)
