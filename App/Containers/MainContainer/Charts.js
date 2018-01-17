import React, { Component } from 'react'
import { View, Text, processColor } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import update from 'immutability-helper'
import _ from 'lodash'
import {LineChart} from 'react-native-charts-wrapper'
const COLOR_PURPLE = processColor('#697dfb')

// Styles
import styles from '../Styles/ChartsStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChartNavigation from '../../Navigation/ChartNavigation'

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
      data: {}
    }

    this.xAxis = {
      gridColor: processColor('red'),
      gridLineWidth: 1,
      axisLineColor: processColor('darkgray'),
      axisLineWidth: 1.5,
      gridDashedLine: {
        lineLength: 10,
        spaceLength: 10
      },
      avoidFirstLastClipping: true,
      position: 'BOTTOM',

      labelCount: 5,
      enabled: true,
      drawLabels: true,
      drawAxisLine: false,
      drawGridLines: false,

      // style
      textColor: processColor('blue'),
      textSize: 10,
    }
    this.yAxis = {
      left: {
        enabled: true,
        drawGridLines: false
      },
      right: {
        enabled: false
      }
    }

    this.chartProps = {

      // background color for chart wrapper
      drawGridBackground: false,
      gridBackgroundColor: processColor('green'),

      // border for chart wrapper
      drawBorders: false,
      borderColor: processColor('orange'),
      borderWidth: 10,

      minOffset: 10,
      maxVisibleValueCount: 50,
      autoScaleMinMaxEnabled: true,
      keepPositionOnRotation: true,
      noDataText: 'No Data Available'
    }
  }

  componentDidMount () {

  }


  render() {

    const { vitalSigns } = this.props

    let resp, temp

    if (vitalSigns.length > 0) {
      resp = {
        dataSets: [{
          values: vitalSigns.map((vitalSign) => ({y: vitalSign.respiratory})),
          label: '',
          config: {
            lineWidth: 1.5,
            drawCubic: true,
            drawHighlightIndicators: false,
            color: COLOR_PURPLE,
            drawFilled: true,
            fillColor: COLOR_PURPLE,
            fillAlpha: 90,

            // circle config
            circleRadius: 10,
            drawCircles: false,
            drawCubicIntensity: 5,
            circleColor: processColor('green'),
            circleColors: [processColor('black'), processColor('red'), processColor('orange')],
            circleHoleColor: processColor('black'),
            drawCircleHole: true,

            drawVerticalHighlightIndicator: false,
            drawHorizontalHighlightIndicator: false,
            highlightLineWidth: 20,

            // common
            highlightEnabled: true,
            drawValues: false,
            valueTextSize: 5,
            valueTextColor: processColor('green'),
            visible: true,
            valueFormatter: "###.0 bpm",

          }
        }],
      }

      temp = {
        dataSets: [{
          values: vitalSigns.map((vitalSign) => ({y: vitalSign.temperature})),
          label: '',
          config: {
            lineWidth: 1.5,
            drawCubic: true,
            drawHighlightIndicators: false,
            color: COLOR_PURPLE,
            drawFilled: true,
            fillColor: COLOR_PURPLE,
            fillAlpha: 90,

            // circle config
            circleRadius: 10,
            drawCircles: false,
            drawCubicIntensity: 5,
            circleColor: processColor('green'),
            circleColors: [processColor('black'), processColor('red'), processColor('orange')],
            circleHoleColor: processColor('black'),
            drawCircleHole: true,

            drawVerticalHighlightIndicator: false,
            drawHorizontalHighlightIndicator: false,
            highlightLineWidth: 20,

            // common
            highlightEnabled: true,
            drawValues: false,
            valueTextSize: 5,
            valueTextColor: processColor('green'),
            visible: true,
            valueFormatter: "###.0 C",

          }
        }],
      }
    }



    const xAxis = {
      gridColor: processColor('red'),
      gridLineWidth: 1,
      axisLineColor: processColor('darkgray'),
      avoidFirstLastClipping: true,
      position: 'BOTTOM',

      labelCount: 2,
      labelCountForce: true,
      enabled: true,
      drawLabels: true,
      drawAxisLine: false,
      drawGridLines: false,

      // style
      textColor: processColor('blue'),
      textSize: 10,
      valueFormatter: this.props.vitalSigns.map(vitalSign => moment(vitalSign.registerAt).fromNow())
    }

    return (

      <View style={styles.wrapper}>

        <View style={styles.container}>
          <Text style={styles.chartHeader}>Temperature (°C) - Real Time</Text>
          <LineChart
            {...this.chartProps}
            style={styles.chart}
            data={temp}
            chartDescription={{text: 'Temperature'}}
            xAxis={xAxis}
            yAxis={this.yAxis}
            legend={{enabled: false}}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.chartHeader}>Respiratory (BPS) - Real Time</Text>
          <LineChart
            {...this.chartProps}
            style={styles.chart}
            data={resp}
            chartDescription={{text: 'Respiratory'}}
            xAxis={xAxis}
            yAxis={this.yAxis}
            legend={{enabled: false}}
          />
        </View>

      </View>
    );
  }

}

const mapStateToProps = (state) => {
  const { data } = state
  return {
    vitalSigns: data.vitalSigns
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts)
