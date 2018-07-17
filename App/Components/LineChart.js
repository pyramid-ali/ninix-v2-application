import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { ClipPath, Defs, Rect } from 'react-native-svg';
import { AreaChart, Path, YAxis } from 'react-native-svg-charts';

import styles from './Styles/LineChartStyle';

export default class LineChart extends Component {
  render() {
    const { backgroundColor, data, formatLabel, title } = this.props;

    const Clips = ({ x, width }) => (
      <Defs key={'clips'}>
        <ClipPath id={'clip-path-1'} key={'0'}>
          <Rect x={0} y={'0'} width={width} height={'100%'} />
        </ClipPath>
      </Defs>
    );

    const Line = ({ line }) => (
      <Path
        key={'line'}
        d={line}
        stroke={'white'}
        fill={'none'}
        clipPath={'url(#clip-path-1)'}
      />
    );

    if (data) {
      return (
        <View style={[styles.container, { backgroundColor }]}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <View style={styles.chartWrapper}>
            <YAxis
              data={data}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{
                fill: 'white',
                fontSize: 10,
              }}
              numberOfTicks={5}
              formatLabel={formatLabel}
            />
            <AreaChart
              style={styles.chartStyle}
              data={data}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{
                clipPath: 'url(#clip-path-1)',
              }}
            >
              <Clips />
              <Line />
            </AreaChart>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        <View style={styles.textWrapper}>
          <Text style={styles.description}>There is no valid data</Text>
        </View>
      </View>
    );
  }
}

LineChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.number),
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formatLabel: PropTypes.func,
};

LineChart.defaultProps = {
  backgroundColor: '#64b3f4',
  formatLabel: undefined,
};
