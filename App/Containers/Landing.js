// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Swiper from '@nart/react-native-swiper';

// Dependencies
import AppAction from '../Redux/AppRedux';
import Introduction from '../Components/Introduction';

// Data
import introductions from '../Fixtures/IntroductionContent';

// Styles
import styles from './Styles/LandingStyle';
import Colors from '../Themes/Colors';

class Landing extends Component {
  // TODO: give animation when transient to another page
  // TODO: transitioning between page not work correctly, we can use react native swiper
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Swiper loop={false} activeDotColor={Colors.primary}>
          {this.renderPages()}
        </Swiper>

        <TouchableOpacity
          onPress={() => {
            this.props.introduceApp();
            this.props.navigation.navigate('Login');
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>LET'S START</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderPages() {
    return introductions.map((introduction, index) => {
      const { title, description, image } = introduction;
      return (
        <View style={{ flex: 1 }} key={index}>
          <Introduction
            key={index}
            title={title}
            source={image}
            description={description}
          />
        </View>
      );
    });
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    introduceApp: () => dispatch(AppAction.didAppIntroduce()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
