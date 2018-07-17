import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Metrics } from '../Themes/';
import styles from './Styles/BannerStyle';

export default class Banner extends Component {
  backgrounds = {
    success: Colors.secondary,
    alert: Colors.alert,
    warning: Colors.warning,
    typical: Colors.dark,
  };

  constructor(props) {
    super(props);
  }

  // TODO: add fontFamily to props
  render() {
    const { title, subtitle } = this.props;
    const dynamicStyles = this.dynamicStyles();
    return (
      <View style={[styles.container, dynamicStyles.container]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    );
  }

  dynamicStyles() {
    const { type, height } = this.props;
    return StyleSheet.create({
      container: {
        height: Metrics.screenHeight * height,
        backgroundColor: this.backgrounds[type],
      },
    });
  }
}

Banner.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  type: PropTypes.oneOf(['success', 'alert', 'warning', 'typical']),
  height: PropTypes.number,
};

Banner.defaultProps = {
  height: 0.4,
};
