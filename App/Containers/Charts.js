// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StatusBar } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { transformTemperature, transformRespiratory } from '../Transform/ArrayDataManipulate'

// Styles
import Colors from '../Themes/Colors'
import LineChart from "../Components/LineChart"

class Charts extends Component {

  constructor (props) {
    super(props)
    this.state = {
      chart: 'temperature'
    }
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.forceUpdate()
      StatusBar.setBackgroundColor(Colors.secondary, true)
    })

  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  // render() {
  //   const { stream } = this.props
  //
  //   return (
  //     <View style={{flex: 1}}>
  //       <Header
  //         statusBarProps={{backgroundColor: Colors.secondary}}
  //         backgroundColor={Colors.secondary}
  //         centerComponent={{ text: 'ANALYSIS', style: { color: '#fff' } }}
  //       />
  //       <View style={styles.chartWrapper}>
  //         <Text style={styles.chartTitle}>{ this.state.chart.toUpperCase() }</Text>
  //         {/*<CurvedChart*/}
  //           {/*text={this.state.chart.toUpperCase()}*/}
  //           {/*temperatures={*/}
  //           {/*this.state.chart === 'temperature' ?*/}
  //             {/*transformTemperature(stream) :*/}
  //             {/*transformRespiratory(stream.map((item) => item[this.state.chart]))*/}
  //           {/*}*/}
  //         {/*/>*/}
  //         <LineChart
  //           temperatures={{
  //             labels: ['1m', '30s', 'now'],
  //             temperaturessets: [{
  //               temperatures: [
  //                 Math.random() * 100,
  //                 Math.random() * 100,
  //                 Math.random() * 100,
  //                 Math.random() * 100,
  //                 Math.random() * 100,
  //                 Math.random() * 100,
  //                 Math.random() * 100
  //               ]
  //             }]
  //           }}
  //           width={Metrics.screenWidth} // from react-native
  //           height={220}
  //           renderHorizontalLines={{
  //             count: 0
  //           }}
  //           renderVerticalLabels={{
  //             count: 0
  //           }}
  //           chartConfig={{
  //             backgroundColor: '#e26a00',
  //             backgroundGradientFrom: '#fb8c00',
  //             backgroundGradientTo: '#ffa726',
  //             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //             style: {
  //               borderRadius: 16
  //             }
  //           }}
  //           bezier
  //           style={{
  //             marginVertical: 8,
  //             borderRadius: 16
  //           }}
  //         />
  //       </View>
  //       <SegmentedControl
  //         style={styles.segment}
  //         items={['temperature', 'respiratory']}
  //         onChange={this.onChangeChart.bind(this)}
  //       />
  //     </View>
  //   )
  // }

  render() {

    const { bluetooth } = this.props

    return (
      <View style={{flex: 1}}>
        <Header
          statusBarProps={{backgroundColor: Colors.secondary}}
          backgroundColor={Colors.secondary}
          centerComponent={{ text: 'ANALYSIS', style: { color: '#fff' } }}
        />

        { bluetooth.isConnected ?
          this.renderCharts() :
          this.renderNoConnection()
        }

      </View>
    )
  }

  renderCharts () {
    const temperatures = transformTemperature(this.props.stream)
    const resps = transformRespiratory(this.props.stream)

    return (
      <View style={{flex: 1}}>
        <LineChart title='Temperature' data={temperatures} />
        <LineChart title='Respiratory' data={resps} />
      </View>

    )
  }

  renderNoConnection () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 10}}>No Connection</Text>
        <Icon type='material-community' name='bluetooth-off' size={60} />
        <Text style={{textAlign: 'center', fontSize: 10, color: 'gray', padding: 30}}>There is no connection between app and device, please go to device tap and connect to ninix device to see real time charts</Text>
      </View>
    )
  }

}

Charts.navigationOptions = {
  tabBarLabel: 'Charts',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={20}
      name="show-chart"
      color={tintColor}
    />
  ),
}

// TODO: we must change algorithm of showing chart temperatures, and move logic to another file

const mapStateToProps = (state) => {
  const { data, bluetooth } = state
  return {
    stream: data.stream,
    bluetooth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charts)
