import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, processColor } from 'react-native'
import styles from './Styles/CurvedChartStyle'
import {LineChart} from 'react-native-charts-wrapper'
import moment from 'moment'
import _ from 'lodash'

export default class CurvedChart extends Component {

  constructor(props) {
    super(props)
    this.chartProps = {

      drawGridBackground: false,
      // gridBackgroundColor: processColor('#9A12B3'),
      drawBorders: false,
      // borderColor: processColor('orange'),
      // borderWidth: 10,
      // minOffset: 10,
      maxVisibleValueCount: 10,
      // visibleRange: {
      //   x: {min: 0, max: 10},
      //   y: {min: 0, max: 10}
      // },
      // autoScaleMinMaxEnabled: false,
      // keepPositionOnRotation: false,
      scaleEnabled: true,
      scaleXEnabled: true,
      scaleYEnabled: true,
      dragEnabled: false,
      pinchZoom: false,
      doubleTapToZoomEnabled: false,
      // zoom: {
      //   scaleX: 1,
      //   scaleY: 1,
      //   xValue: 1,
      //   yValue: 1,
      //   axisDependency: 'LEFT'
      // },
      // viewPortOffsets: {
      //   left: 1,
      //   top: 1,
      //   right: 1,
      //   bottom: 1
      // },
      // animation: {
      //   durationX: 1,
      //   durationY: 1,
      //   // easingX: 'linear',
      //   // easingY: 'linear'
      // },
      // chartBackgroundColor: processColor('green'),
      // logEnabled: true,
      noDataText: 'No Data Available',
      // touchEnabled: true,
      // dragDecelerationEnabled: true,
      // marker: {
      //   enabled: true,
      //   digits: 1,
      //   markerColor: processColor('blue'),
      //   textColor: processColor('red'),
      //   textSize: 10
      // },
      // highlights: [
      //   {
      //     x: 1,
      //     dataSetIndex: 1,
      //     y: 1,
      //     stackIndex: 1
      //   }
      // ],
      xAxis: {
        enabled: false,
        // drawLabels: false,
        drawAxisLine: false,
        drawGridLines: false,
        // textColor: processColor('yellow'),
        textSize: 14,
        // fontFamily: 'tahoma',
        fontStyle: styles.xAxis,
        // gridColor: processColor('orange'),
        // gridLineWidth: 1,
        // axisLineColor: processColor('purple'),
        // axisLineWidth: 1,
        // gridDashedLine: {
        //   lineLength: 1,
        //   spaceLength: 1,
        //   phase: 1
        // },
        // limitLines: [
        //   {
        //     limit: 1,
        //     label: 'limit',
        //     lineColor: processColor('brown'),
        //     lineWidth: 1
        //   }
        // ],
        // drawLimitLinesBehindData: true,
        // axisMaximum: 10,
        // axisMinimum: 1,
        granularity: 1,
        granularityEnabled: true,
        // labelCount: 5,
        // labelCountForce: true,
        // centerAxisLabels: true,
        valueFormatter: ['5m', '4m', '3m', '1m', 'now'],
        // labelRotationAngle: 90,
        // avoidFirstLastClipping: true,
        position: 'BOTTOM',
      },
      yAxis: {
        left: {
          enabled: true,
          // drawLabels: false,
          // drawAxisLine: false,
          drawGridLines: false,
          textColor: processColor('#000'),
          // textSize: 10,
          // fontFamily: 'tahoma',
          // fontStyle: 1,
          // gridColor: processColor('orange'),
          // gridLineWidth: 1,
          axisLineColor: processColor('white'),
          axisLineWidth: 0,
          // gridDashedLine: {
          //   lineLength: 1,
          //   spaceLength: 1,
          //   phase: 1
          // },
          // limitLines: [
          //   {
          //     limit: 1,
          //     label: 'limit',
          //     lineColor: processColor('brown'),
          //     lineWidth: 1
          //   }
          // ],
          // drawLimitLinesBehindData: true,
          // axisMaximum: 10,
          // axisMinimum: 1,
          // granularity: 1,
          // granularityEnabled: true,
          labelCount: 5,
          // labelCountForce: true,
          // centerAxisLabels: true,
          // valueFormatter: 'largeValue',
          // inverted: false,
          // spaceTop: 5,
          // spaceBottom: 5,
          // // position: 'left',
          // maxWidth: 400,
          // minWidth: 100,
          // zeroLine: {
          //   enabled: true,
          //   lineWidth: 1,
          //   lineColor: processColor('red')
          // }
        },
        right: {
          enabled: false,
          //   drawLabels: false,
          //   drawAxisLine: false,
          //   drawGridLines: false,
          //   textColor: processColor('yellow'),
          //   textSize: 10,
          //   fontFamily: 'tahoma',
          //   fontStyle: 1,
          //   gridColor: processColor('orange'),
          //   gridLineWidth: 1,
          //   axisLineColor: processColor('purple'),
          //   axisLineWidth: 1,
          //   gridDashedLine: {
          //     lineLength: 1,
          //     spaceLength: 1,
          //     phase: 1
          //   },
          //   limitLines: [
          //     {
          //       limit: 1,
          //       label: 'limit',
          //       lineColor: processColor('brown'),
          //       lineWidth: 1
          //     }
          //   ],
          //   drawLimitLinesBehindData: true,
          //   axisMaximum: 10,
          //   axisMinimum: 1,
          //   granularity: 1,
          //   granularityEnabled: true,
          //   labelCount: 5,
          //   labelCountForce: true,
          //   centerAxisLabels: true,
          //   // valueFormatter: 'largeValue',
          //   inverted: false,
          //   spaceTop: 5,
          //   spaceBottom: 5,
          //   // position: 'left',
          //   maxWidth: 400,
          //   minWidth: 100,
          //   zeroLine: {
          //     enabled: true,
          //     lineWidth: 1,
          //     lineColor: processColor('red')
          //   }
          // }
        }
      },
      chartDescription: {
        text: 'Temperature - Real Time',
        // textColor: processColor('red'),
        // textSize: 18,
        // positionX: 20,
        // positionY: 20,
        // fontFamily: 'Tahoma',
        // fontStyle: null
      },
      legend: {
        enabled: false,
        // textColor: processColor('red'),
        // textSize: 15,
        // fontFamily: 'tahoma',
        // fontStyle: null,
        // wordWrapEnabled: true,
        // // position: 'bottom',
        // form: 'a',
        // formSize: 20,
        // xEntrySpace: 10,
        // yEntrySpace: 10,
        // formToTextSpace: 10,
        // custom: {
        //   colors: [processColor('blue'), processColor('green')],
        //   labels: ['custom-blue', 'custom-green']
        // }
      }
    }
  }

  componentDidMount () {


  }

  render () {

    let temp = {
      dataSets: [{
        values: this.props.data,
        label: 'dataSet Label',
        config: {
          circleRadius: 5,
          drawCircles: false,
          // drawCubicIntensity: 1,
          mode: 'HORIZONTAL_BEZIER',
          // circleColor: processColor('#52B3D9'),
          // circleColors: [],
          // circleHoleColor: processColor('#3498DB'),
          // drawCircleHole: true,
          colors: [processColor('#D35400')],
          highlightEnabled: true,
          drawValues: false,
          valueTextSize: 15,
          valueTextColor: processColor('#2574A9'),
          visible: true,
          // valueFormatter: 'largeValue',
          // valueFormatterPattern:
          // axisDependency:
          highlightColor: processColor('#D35400'),
          drawVerticalHighlightIndicator: false,
          drawHorizontalHighlightIndicator: false,
          highlightLineWidth: 2,
          fillColor: processColor('#D35400'),
          // fillAlpha: 1,
          drawFilled: true,
          lineWidth: 2
        }
      }],
    }

    return (
      <View style={styles.container}>
        <LineChart
          {...this.chartProps}
          style={styles.chart}
          data={_.isEmpty(this.props.data) ? undefined : temp}
        />
      </View>
    )
  }
}
