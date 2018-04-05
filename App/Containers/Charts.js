// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, processColor } from 'react-native'
import {LineChart} from 'react-native-charts-wrapper'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

// Styles
import styles from './Styles/ChartsStyle'
import SegmentedControl from '../Components/SegmentedControl';
import NavigationBar from '../Components/NavigationBar';
import CurvedChart from '../Components/CurvedChart';
const COLOR_PURPLE = processColor('#697dfb')


class Charts extends Component {
  static navigationOptions = {
    tabBarLabel: 'Charts',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        size={20}
        name="area-chart"
        color={tintColor}
      />
    ),
  }

  constructor (props) {
    super(props)
    this.state = {
      chart: 'temperature'
    }
  }

  componentDidMount () {}

  render() {
    const { stream } = this.props

    return (
      <View style={{flex: 1}}>
        <NavigationBar
          style={styles.navBar}
          textStyle={styles.title}
        >
          Analysis
        </NavigationBar>
        <View style={styles.container}>
          <View style={styles.chartWrapper}>
            <Text style={styles.chartTitle}>{ this.state.chart.toUpperCase() }</Text>
            <CurvedChart data={collapse(stream.map((item) => item[this.state.chart]))}/>
          </View>
          <SegmentedControl
            style={styles.segment}
            items={['temperature', 'respiratory']}
            onChange={this.onChangeChart.bind(this)}
          />
        </View>
      </View>
    )
  }

  onChangeChart (item, index) {
    console.tron.log({log: 'change chart', item})
    this.setState({
      chart: item
    })
  }

}

// TODO: we must change algorithm of showing chart data, and move logic to another file
function collapse (data) {
  const result = []
  const length = data.length
  let period = length / 10 || 1
  for (let i = 0; i < length; i += period) {
    const sub = data.slice(i, i + period)
    const average = sub.reduce((acc, current) => acc + current, 0) / sub.length
    result.push(average)
  }

  return result
}

const mapStateToProps = (state) => {
  const { data } = state
  return {
    stream: data.stream
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts)
