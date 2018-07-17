import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/SegmentedControlStyle';

export default class SegmentedControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderList()}
      </View>
    );
  }

  renderList() {
    const { items, onChange } = this.props;
    return items.map((item, index) => {
      return (
        <TouchableOpacity
          style={[
            styles.segment,
            this.state.active === index ? styles.activeSegment : null,
            index < items.length - 1 ? styles.rightBordered : null,
          ]}
          key={index}
          onPress={() => {
            this.setState({
              active: index,
            });
            onChange(item, index);
          }}
        >
          <Text
            style={[
              styles.segmentText,
              this.state.active === index ? styles.activeSegmentText : null,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
  }
}

SegmentedControl.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

SegmentedControl.defaultProps = {
  active: 0,
};
