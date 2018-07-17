// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

// Dependencies
import AppAction from '../Redux/AppRedux';

// Styles
import styles from './Styles/SplashScreenStyle';

class SplashScreen extends Component {
  componentDidMount() {
    // initialize app, show NINIX logo until all works done
    this.animation.play();
    this.props.init();
  }

  render() {
    // TODO: we should have interactive animation here, user waiting must be acceptable
    return (
      <View style={styles.container}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={require('../../assets/lotties/loader_animation.json')}
        />
        <Text style={styles.center}>NINIX</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => dispatch(AppAction.init()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
