import React, { Component } from 'react'
import { ScrollView, Text, View, processColor } from 'react-native'
import { connect } from 'react-redux'
import {BarChart} from 'react-native-charts-wrapper';

// Styles
import styles from '../Styles/GrowthChartStyle'

class GrowthChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}],
          label: 'Bar dataSet',
          config: {
            color: processColor('teal'),
            barSpacePercent: 40,
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
          }
        }],
      },
      xAxis: {
        valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        granularityEnabled: true,
        granularity : 1,
        drawGridLines: false
      },
      yAxis: {
        left: {
          drawGridLines: false
        },
        right: {
          drawGridLines: false
        }
      }
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry === null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            drawBorders={false}
            animation={{durationX: 2000}}
            legend={this.state.legend}
            drawGridBackground={false}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrowthChart)
