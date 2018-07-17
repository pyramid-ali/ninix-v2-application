// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ImageBackground } from 'react-native';

// Styles
import styles from './Styles/IntroductionStyle';

export default class Introduction extends Component {
  render() {
    const { source, title, description } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={source}
          style={{ width: '100%', height: '100%' }}
        >
          <View style={styles.wrapper}>
            <Text
              animation="slideInDown"
              direction="alternate"
              style={styles.title}
            >
              {title}
            </Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

Introduction.propTypes = {
  source: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
